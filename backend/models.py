from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text, DateTime, func, BigInteger
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(BigInteger, primary_key=True, index=True)
    username = Column(String(64), unique=True, nullable=False, index=True)
    email = Column(String(320), unique=True, nullable=False, index=True)
    hashed_password = Column(String(256), nullable=False)
    is_active = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    projects = relationship("Project", back_populates="owner", cascade="all, delete-orphan")
    __table_args__ = {'extend_existing': True}


class Project(Base):
    __tablename__ = "projects"
    id = Column(BigInteger, primary_key=True, index=True)
    owner_id = Column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(200), nullable=False)
    type = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    ai_advice = Column(Text, nullable=True)
    is_public = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    owner = relationship("User", back_populates="projects")
    
    # --- ΑΛΛΑΓΗ: Σωστή ρύθμιση cascade για τις απαντήσεις ---
    # Όταν διαγράφεται ένα Project, θέλουμε να διαγράφονται αυτόματα και όλες οι
    # σχετικές απαντήσεις του από τον πίνακα 'answers'.
    answers = relationship("Answer", back_populates="project", cascade="all, delete-orphan")
    __table_args__ = {'extend_existing': True}


class Answer(Base):
    __tablename__ = "answers"
    id = Column(BigInteger, primary_key=True, index=True)
    project_id = Column(BigInteger, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    question_id = Column(String(100), nullable=False, index=True)
    value = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # --- ΑΛΛΑΓΗ: Προσθήκη του back_populates για συνέπεια ---
    # Η σχέση από την πλευρά της απάντησης. Η διαγραφή μιας απάντησης
    # ΔΕΝ πρέπει να επηρεάζει το project.
    project = relationship("Project", back_populates="answers")
    __table_args__ = {'extend_existing': True}