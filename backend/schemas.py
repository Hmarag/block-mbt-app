from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Union, List

# --- User Schemas ---
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True

# --- Project Schemas ---
class ProjectBase(BaseModel):
    name: str
    type: str
    description: Optional[str] = None
    is_public: Optional[bool] = False

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: int
    owner_id: int
    ai_advice: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# --- Answer Schemas ---
class AnswerBase(BaseModel):
    question_id: str
    value: str

class AnswerOut(AnswerBase):
    id: int
    project_id: int

    class Config:
        orm_mode = True

class AnswersIn(BaseModel):
    answers: dict[str, Union[str, List[str]]]

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# --- ΝΕΑ SCHEMAS ΓΙΑ ΑΛΛΑΓΗ ΚΩΔΙΚΟΥ ---
class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordReset(BaseModel):
    token: str
    new_password: str