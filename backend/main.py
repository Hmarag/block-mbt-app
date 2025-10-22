# ...existing code...
import os
from dotenv import load_dotenv

# Φόρτωσε πρώτα τα environment variables (Render secret file ή το τοπικό .env)
secrets_path = "/etc/secrets/.env"
if os.path.exists(secrets_path):
    load_dotenv(dotenv_path=secrets_path)
else:
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# --- IMPORTS ΠΟΥ ΧΡΕΙΑΖΟΜΑΣΤΕ ΑΜΕΣΑ ---
from database import get_session, engine
from models import Base
import json
from fastapi import FastAPI, HTTPException, status, Depends, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta
from typing import List, Union

# Σχήματα/Utilities (πρέπει να είναι μετά το load_dotenv)
from schemas import UserCreate, UserOut, ProjectCreate, ProjectOut, Token, AnswersIn, ContactForm
import auth_utils
import ai_utils
import email_utils
from deps import get_current_user
import crud
# ...existing code...

app = FastAPI(title="Block MBT API")

# --- ΑΛΛΑΓΗ 2: Προσθήκη του live URL στα επιτρεπόμενα origins ---
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://block-mbt-front.onrender.com" # Η διεύθυνση του live frontend στο Render
]
# --- ΤΕΛΟΣ ΑΛΛΑΓΗΣ 2 ---

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

@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, background_tasks: BackgroundTasks, session: AsyncSession = Depends(get_session)):
    db_user = await crud.get_user_by_username(session, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user_email = await crud.get_user_by_email(session, user.email)
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = await crud.create_user(session=session, username=user.username, email=user.email, password=user.password)
    
    verification_token = auth_utils.create_verification_token(email=new_user.email)
    
    # --- ΑΛΛΑΓΗ 3: Δυναμικό URL για το verification link ---
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
    verification_link = f"{frontend_url}/verify-email?token={verification_token}"
    # --- ΤΕΛΟΣ ΑΛΛΑΓΗΣ 3 ---
    
    background_tasks.add_task(
        email_utils.send_verification_email, 
        recipient_email=new_user.email, 
        verification_link=verification_link
    )
    
    return {"message": "Registration successful. Please check your email to verify your account."}

@app.get("/auth/verify-email", response_model=Token)
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

    access_token_expires = timedelta(minutes=auth_utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_utils.create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/auth/login", response_model=Token)
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
    
    access_token_expires = timedelta(minutes=auth_utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_utils.create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

# --- Project & User Endpoints ---

@app.get("/projects/me", response_model=UserOut)
async def read_current_user_data(current_user: UserOut = Depends(get_current_user)):
    return current_user

@app.post("/projects", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
async def create_project(
    project: ProjectCreate,
    session: AsyncSession = Depends(get_session),
    current_user: UserOut = Depends(get_current_user)
):
    return await crud.create_project(session=session, project=project, owner_id=current_user.id)

@app.get("/projects", response_model=List[ProjectOut])
async def get_user_projects(
    session: AsyncSession = Depends(get_session),
    current_user: UserOut = Depends(get_current_user)
):
    return await crud.get_projects_by_owner(session, owner_id=current_user.id)

@app.get("/projects/{project_id}", response_model=ProjectOut)
async def get_project_details(
    project_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: UserOut = Depends(get_current_user)
):
    project = await crud.get_project_by_id(session, project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project

# --- Answer Endpoints ---

@app.post("/projects/{project_id}/answers", status_code=status.HTTP_204_NO_CONTENT)
async def save_project_answers(
    project_id: int,
    answers: AnswersIn,
    session: AsyncSession = Depends(get_session),
    current_user: UserOut = Depends(get_current_user)
):
    project = await crud.get_project_by_id(session, project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found or not authorized")
    await crud.create_project_answers(session, project_id, answers)
    return

@app.get("/projects/{project_id}/answers", response_model=dict[str, Union[str, list[str]]])
async def get_project_answers(
    project_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: UserOut = Depends(get_current_user)
):
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

@app.post("/projects/{project_id}/generate-advice", response_model=ProjectOut)
async def generate_ai_advice(
    project_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: UserOut = Depends(get_current_user)
):
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

    advice_text = await ai_utils.generate_advice_for_project(
        answers=answers_dict, 
        project_type=project.type,
        project_name=project.name
    )

    project.ai_advice = advice_text
    session.add(project)
    await session.commit()
    await session.refresh(project)

    return project


@app.post("/contact", status_code=status.HTTP_202_ACCEPTED)
async def handle_contact_form(form_data: ContactForm, background_tasks: BackgroundTasks):
    try:
        background_tasks.add_task(
            email_utils.send_contact_form_email,
            name=form_data.name,
            sender_email=form_data.email,
            subject=form_data.subject,
            message_body=form_data.message
        )
        return {"message": "Το μήνυμα έχει προγραμματιστεί για αποστολή."}
    except Exception as e:
        print(f"Error in /contact endpoint: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Παρουσιάστηκε ένα σφάλμα κατά την αποστολή του email."
        )