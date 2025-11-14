import os
from dotenv import load_dotenv

# Φόρτωσε πρώτα τα environment variables
secrets_path = "/etc/secrets/.env"
if os.path.exists(secrets_path):
    load_dotenv(dotenv_path=secrets_path)
else:
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

from database import get_session, engine
from models import Base
import json
from fastapi import FastAPI, HTTPException, status, Depends, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta
from typing import List, Union
from fastapi.responses import RedirectResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# --- ΠΡΟΣΘΗΚΗ ΝΕΩΝ SCHEMAS ---
from schemas import UserCreate, UserOut, ProjectCreate, ProjectOut, Token, AnswersIn, ContactForm, PasswordResetRequest, PasswordReset
import auth_utils
import ai_utils
import email_utils
from deps import get_current_user
import crud
from google_auth import google_client, REDIRECT_URI
import secrets

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Block MBT API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
    "http://localhost:5173", "http://127.0.0.1:5173",
    "https://www.blockmbt.com", "https://blockmbt.com",
    "https://www.blockmbt.gr", "https://blockmbt.gr",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# --- Authentication Endpoints ---

@app.get("/auth/google/login", tags=["Authentication"])
async def google_login():
    authorization_url = await google_client.get_authorization_url(redirect_uri=REDIRECT_URI)
    return RedirectResponse(authorization_url)

@app.get("/auth/google/callback", tags=["Authentication"])
async def google_callback(code: str, session: AsyncSession = Depends(get_session)):
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
    try:
        token_data = await google_client.get_access_token(code, redirect_uri=REDIRECT_URI)
        
        # --- ΔΙΟΡΘΩΜΕΝΗ ΛΟΓΙΚΗ & UNPACKING ---
        google_id, user_email, user_name_from_google = await google_client.get_id_email(token=token_data["access_token"])

        # Έλεγχος ασφαλείας: Αν το Google δεν επιστρέψει email, αποτυγχάνουμε.
        if not user_email:
            raise HTTPException(status_code=400, detail="Email not provided by Google.")

        # Δημιουργία ενός ασφαλούς username
        user_name = (user_name_from_google or user_email.split('@')[0]).replace(" ", "_")
        # -----------------------------------------
        
        db_user = await crud.get_user_by_email(session, email=user_email)

        if not db_user:
            random_password = secrets.token_urlsafe(16)
            db_user = crud.prepare_new_user(username=user_name, email=user_email, password=random_password)
            db_user.is_active = True
            session.add(db_user)
            await session.commit()
            await session.refresh(db_user)

        access_token = auth_utils.create_access_token(data={"sub": db_user.username})
        return RedirectResponse(url=f"{frontend_url}/auth/callback?token={access_token}")
        
    except Exception as e:
        print(f"Google Auth Error: {e}")
        return RedirectResponse(url=f"{frontend_url}/login?error=google-auth-failed")

@app.post("/auth/register", status_code=status.HTTP_201_CREATED, tags=["Authentication"])
async def register_user(user: UserCreate, background_tasks: BackgroundTasks, session: AsyncSession = Depends(get_session)):
    if await crud.get_user_by_username(session, user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    if await crud.get_user_by_email(session, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = await crud.create_user(session=session, username=user.username, email=user.email, password=user.password)
    verification_token = auth_utils.create_verification_token(email=new_user.email)
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
    verification_link = f"{frontend_url}/verify-email?token={verification_token}"
    background_tasks.add_task(email_utils.send_verification_email, recipient_email=new_user.email, verification_link=verification_link)
    return {"message": "Registration successful. Please check your email to verify your account."}

@app.get("/auth/verify-email", response_model=Token, tags=["Authentication"])
async def verify_email_and_login(token: str, session: AsyncSession = Depends(get_session)):
    email = auth_utils.decode_verification_token(token)
    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired verification token.")
    user = await crud.get_user_by_email(session, email=email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    if not user.is_active:
        user.is_active = True
        await session.commit()
        await session.refresh(user)
    access_token = auth_utils.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/auth/login", response_model=Token, tags=["Authentication"])
async def login_for_access_token(request: Request, session: AsyncSession = Depends(get_session)):
    try:
        login_data = await request.json()
        identifier = login_data.get("username") or login_data.get("email")
        password = login_data.get("password")
        if not identifier or not password:
            raise HTTPException(status_code=422, detail="Email/Username and password required")
    except json.JSONDecodeError:
        raise HTTPException(status_code=422, detail="Invalid JSON body")
    user = await auth_utils.authenticate_user(session, identifier, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account not verified. Please check your email.")
    access_token = auth_utils.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# --- ΝΕΑ ENDPOINTS ΓΙΑ ΑΛΛΑΓΗ ΚΩΔΙΚΟΥ ---
@app.post("/auth/request-password-reset", status_code=status.HTTP_202_ACCEPTED, tags=["Authentication"])
async def request_password_reset(request_data: PasswordResetRequest, background_tasks: BackgroundTasks, session: AsyncSession = Depends(get_session)):
    user = await crud.get_user_by_email(session, email=request_data.email)
    if user:
        reset_token = auth_utils.create_password_reset_token(email=user.email)
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
        reset_link = f"{frontend_url}/reset-password?token={reset_token}"
        background_tasks.add_task(email_utils.send_password_reset_email, recipient_email=user.email, reset_link=reset_link)
    return {"message": "If an account with this email exists, a password reset link has been sent."}

@app.post("/auth/reset-password", status_code=status.HTTP_200_OK, tags=["Authentication"])
async def reset_password(reset_data: PasswordReset, session: AsyncSession = Depends(get_session)):
    email = auth_utils.decode_password_reset_token(reset_data.token)
    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token.")
    user = await crud.get_user_by_email(session, email=email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    user.hashed_password = auth_utils.get_password_hash(reset_data.new_password)
    session.add(user)
    await session.commit()
    return {"message": "Password has been reset successfully."}

# --- Project & User Endpoints ---
@app.get("/projects/me", response_model=UserOut, tags=["Users"])
async def read_current_user_data(current_user: UserOut = Depends(get_current_user)):
    return current_user

@app.post("/projects", response_model=ProjectOut, status_code=status.HTTP_201_CREATED, tags=["Projects"])
async def create_project(project: ProjectCreate, session: AsyncSession = Depends(get_session), current_user: UserOut = Depends(get_current_user)):
    return await crud.create_project(session=session, project=project, owner_id=current_user.id)

@app.get("/projects", response_model=List[ProjectOut], tags=["Projects"])
async def get_user_projects(session: AsyncSession = Depends(get_session), current_user: UserOut = Depends(get_current_user)):
    return await crud.get_projects_by_owner(session, owner_id=current_user.id)

@app.get("/projects/{project_id}", response_model=ProjectOut, tags=["Projects"])
async def get_project_details(project_id: int, session: AsyncSession = Depends(get_session), current_user: UserOut = Depends(get_current_user)):
    project = await crud.get_project_by_id(session, project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project

@app.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Projects"])
async def delete_project(project_id: int, session: AsyncSession = Depends(get_session), current_user: UserOut = Depends(get_current_user)):
    deleted_project = await crud.delete_project_by_id(session, project_id=project_id, owner_id=current_user.id)
    if deleted_project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found or you do not have permission to delete it")
    return

# --- Answer Endpoints ---
@app.post("/projects/{project_id}/answers", status_code=status.HTTP_204_NO_CONTENT, tags=["Answers"])
async def save_project_answers(project_id: int, answers: AnswersIn, session: AsyncSession = Depends(get_session), current_user: UserOut = Depends(get_current_user)):
    project = await crud.get_project_by_id(session, project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found or not authorized")
    await crud.create_project_answers(session, project_id, answers)
    return

@app.get("/projects/{project_id}/answers", response_model=dict[str, Union[str, list[str]]], tags=["Answers"])
async def get_project_answers(project_id: int, session: AsyncSession = Depends(get_session), current_user: UserOut = Depends(get_current_user)):
    project = await crud.get_project_by_id(session, project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found or not authorized")
    answers = await crud.get_answers_by_project_id(session, project_id)
    answers_dict = {}
    for answer in answers:
        try:
            answers_dict[answer.question_id] = json.loads(answer.value)
        except (json.JSONDecodeError, TypeError):
            answers_dict[answer.question_id] = answer.value
    return answers_dict

# --- AI Advice Endpoint ---
@app.post("/projects/{project_id}/generate-advice", response_model=ProjectOut, tags=["AI"])
@limiter.limit("5/hour")
async def generate_ai_advice(project_id: int, request: Request, session: AsyncSession = Depends(get_session), current_user: UserOut = Depends(get_current_user)):
    project = await crud.get_project_by_id(session, project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found or not authorized")
    answers_list = await crud.get_answers_by_project_id(session, project_id)
    if not answers_list:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No answers found for this project to generate advice.")
    answers_dict = {}
    for answer in answers_list:
        try:
            answers_dict[answer.question_id] = json.loads(answer.value)
        except (json.JSONDecodeError, TypeError):
            answers_dict[answer.question_id] = answer.value
    advice_text = await ai_utils.generate_advice_for_project(answers=answers_dict, project_type=project.type, project_name=project.name)
    project.ai_advice = advice_text
    session.add(project)
    await session.commit()
    await session.refresh(project)
    return project

# --- Contact Form Endpoint ---
@app.post("/contact", status_code=status.HTTP_202_ACCEPTED, tags=["Contact"])
async def handle_contact_form(form_data: ContactForm, background_tasks: BackgroundTasks):
    try:
        background_tasks.add_task(email_utils.send_contact_form_email, name=form_data.name, sender_email=form_data.email, subject=form_data.subject, message_body=form_data.message)
        return {"message": "Το μήνυμα έχει προγραμματιστεί για αποστολή."}
    except Exception as e:
        print(f"Error in /contact endpoint: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Παρουσιάστηκε ένα σφάλμα κατά την αποστολή του email.")