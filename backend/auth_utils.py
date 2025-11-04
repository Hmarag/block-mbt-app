import os
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from models import User

# --- Password Hashing ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- JWT Settings ---
# Αφαιρούμε τις επικίνδυνες fallback τιμές
SECRET_KEY = os.getenv("SECRET_KEY")
VERIFICATION_SECRET_KEY = os.getenv("VERIFICATION_SECRET_KEY")
ALGORITHM = "HS256"

# Διατηρούμε τις fallback τιμές για τις ρυθμίσεις χρόνου, καθώς δεν είναι μυστικά
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", str(60))) # 1 hour default
VERIFICATION_TOKEN_EXPIRE_MINUTES = int(os.getenv("VERIFICATION_TOKEN_EXPIRE_MINUTES", str(60 * 24))) # 24 hours default

# --- ΚΡΙΣΙΜΟΣ ΕΛΕΓΧΟΣ ΑΣΦΑΛΕΙΑΣ ---
# Αν τα κλειδιά δεν έχουν οριστεί, η εφαρμογή δεν πρέπει να ξεκινήσει.
if not SECRET_KEY or not VERIFICATION_SECRET_KEY:
    raise RuntimeError("CRITICAL: SECRET_KEY and VERIFICATION_SECRET_KEY must be set in environment variables.")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # Χρησιμοποιούμε τη ρύθμιση από το .env
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

async def authenticate_user(session, username_or_email: str, password: str) -> User | None:
    # lazy import to avoid circular import
    from crud import get_user_by_email, get_user_by_username

    user = None
    if "@" in username_or_email:
        user = await get_user_by_email(session, email=username_or_email)
    else:
        user = await get_user_by_username(session, username=username_or_email)

    if not user or not verify_password(password, user.hashed_password):
        return None
    
    return user

# --- Συναρτήσεις για Επιβεβαίωση Email ---

def create_verification_token(email: str) -> str:
    expires_delta = timedelta(minutes=VERIFICATION_TOKEN_EXPIRE_MINUTES)
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": email}
    encoded_jwt = jwt.encode(to_encode, VERIFICATION_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_verification_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, VERIFICATION_SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")
        if email is None:
            return None
        return email
    except JWTError:
        return None