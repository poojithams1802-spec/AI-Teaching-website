from sqlalchemy import Column, Integer, Float, Boolean, DateTime, ForeignKey
from datetime import datetime, timezone

from app.database import Base


class ChapterProgress(Base):
    __tablename__ = "chapter_progress"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    chapter_id = Column(
        Integer,
        ForeignKey("chapters.id"),
        nullable=False
    )

    completion_percentage = Column(
        Float,
        nullable=False,
        default=0.0
    )

    quiz_score = Column(
        Float,
        nullable=True,
        default=0.0
    )

    completed = Column(
        Boolean,
        nullable=False,
        default=False
    )

    last_accessed = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )


class FlashcardProgress(Base):
    __tablename__ = "flashcard_progress"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    flashcard_id = Column(
        Integer,
        ForeignKey("flashcards.id"),
        nullable=False
    )

    reviewed = Column(
        Boolean,
        nullable=False,
        default=False
    )

    review_count = Column(
        Integer,
        nullable=False,
        default=0
    )

    last_reviewed = Column(
        DateTime,
        nullable=True
    )