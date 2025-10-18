from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
import json

from models import User, Project, Answer
from schemas import ProjectCreate, AnswersIn
from auth_utils import get_password_hash

async def get_user_by_username(session: AsyncSession, username: str) -> User | None:
    result = await session.execute(select(User).where(User.username == username))
    return result.scalars().first()

async def get_user_by_email(session: AsyncSession, email: str) -> User | None:
    result = await session.execute(select(User).where(User.email == email))
    return result.scalars().first()

async def create_user(session: AsyncSession, username: str, email: str, password: str) -> User:
    hashed_password = get_password_hash(password)
    db_user = User(username=username, email=email, hashed_password=hashed_password)
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return db_user

async def create_project(session: AsyncSession, project: ProjectCreate, owner_id: int) -> Project:
    db_project = Project(**project.dict(), owner_id=owner_id)
    session.add(db_project)
    await session.commit()
    await session.refresh(db_project)
    return db_project

async def create_project_answers(session: AsyncSession, project_id: int, answers_in: AnswersIn):
    """
    Διαγράφει τις παλιές απαντήσεις και εισάγει τις νέες.
    """
    await session.execute(
        delete(Answer).where(Answer.project_id == project_id)
    )
    await session.flush()

    new_answers = []
    for q_id, q_value in answers_in.answers.items():
        # Μετατρέπουμε τις λίστες σε JSON string για αποθήκευση
        value_to_db = json.dumps(q_value) if isinstance(q_value, list) else q_value
        
        # Αγνοούμε τις κενές τιμές
        if not value_to_db or (isinstance(value_to_db, str) and value_to_db.strip() == ""):
            continue

        new_answers.append(
            Answer(
                project_id=project_id,
                question_id=q_id,
                value=value_to_db
            )
        )

    if new_answers:
        session.add_all(new_answers)
        await session.commit()

async def get_project_by_id(session: AsyncSession, project_id: int) -> Project | None:
    result = await session.execute(select(Project).where(Project.id == project_id))
    return result.scalars().first()

async def get_projects_by_owner(session: AsyncSession, owner_id: int) -> list[Project]:
    result = await session.execute(select(Project).where(Project.owner_id == owner_id).order_by(Project.updated_at.desc()))
    return result.scalars().all()

async def get_answers_by_project_id(session: AsyncSession, project_id: int) -> list[Answer]:
    result = await session.execute(select(Answer).where(Answer.project_id == project_id))
    return result.scalars().all()