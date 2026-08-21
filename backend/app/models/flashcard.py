from sqlalchemy import Column, Integer, Text, ForeignKey
from app.database import Base


class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)

    chapter_id = Column(
        Integer,
        ForeignKey("chapters.id"),
        nullable=False
    )

    front = Column(Text, nullable=False)

    back = Column(Text, nullable=False)