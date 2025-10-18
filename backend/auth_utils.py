from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from models import User
from crud import get_user_by_username, get_user_by_email

# --- Password Hashing ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- JWT Settings for Login ---
SECRET_KEY = "a_very_secret_key_that_should_be_in_env_file" # TODO: Move to .env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 24 hours

# --- ΝΕΟ: JWT Settings for Email Verification ---
VERIFICATION_SECRET_KEY = "another_super_secret_for_verification" # TODO: Move to .env
VERIFICATION_TOKEN_EXPIRE_MINUTES = 60 * 24 # 1 day

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

async def authenticate_user(session: AsyncSession, username_or_email: str, password: str) -> User | None:
    user = None
    if "@" in username_or_email:
        user = await crud.get_user_by_email(session, email=username_or_email)
    else:
        user = await crud.get_user_by_username(session, username=username_or_email)

    if not user or not verify_password(password, user.hashed_password):
        return None
    
    return user

# --- ΝΕΑ ΣΥΝΑΡΤΗΣΗ: Δημιουργία Token για Επιβεβαίωση Email ---
def create_verification_token(email: str) -> str:
    expires_delta = timedelta(minutes=VERIFICATION_TOKEN_EXPIRE_MINUTES)
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": email}
    encoded_jwt = jwt.encode(to_encode, VERIFICATION_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- ΝΕΑ ΣΥΝΑΡΤΗΣΗ: Αποκωδικοποίηση Token Επιβεβαίωσης ---
def decode_verification_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, VERIFICATION_SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")
        if email is None:
            return None
        return email
    except JWTError:
        return None