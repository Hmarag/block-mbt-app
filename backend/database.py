import os
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://devuser:devpass@localhost:5432/block_mbt",
)

engine = create_async_engine(DATABASE_URL, echo=False, future=True)

# Compatibility: use async_sessionmaker if available, otherwise sessionmaker(..., class_=AsyncSession)
try:
    from sqlalchemy.ext.asyncio import async_sessionmaker
    async_session = async_sessionmaker(engine, expire_on_commit=False)
except Exception:
    from sqlalchemy.orm import sessionmaker
    async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session