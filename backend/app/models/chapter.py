from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base


class Chapter(Base):
    __tablename__ = "chapters"

    id = Column(Integer, primary_key=True, index=True)

    subject_id = Column(
        Integer,
        ForeignKey("subjects.id"),
        nullable=False
    )

    name = Column(String, nullable=False)

    chapter_number = Column(Integer, nullable=False)

    topics = Column(Text, nullable=True)

    youtube_url = Column(String, nullable=True)