from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
import auth_utils
import crud
from models import User
from schemas import UserOut

# --- ΤΕΛΙΚΗ ΑΛΛΑΓΗ: Το tokenUrl πρέπει να ταιριάζει με το endpoint του login ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), session: AsyncSession = Depends(get_session)) -> UserOut:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    
    payload = auth_utils.decode_token(token)
    if payload is None:
        raise credentials_exception
        
    username: str | None = payload.get("sub")
    if username is None:
        raise credentials_exception
    
    user = await crud.get_user_by_username(session, username=username)
    if user is None:
        raise credentials_exception
        
    return user