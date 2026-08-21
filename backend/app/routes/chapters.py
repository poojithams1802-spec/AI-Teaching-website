from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.subject import Subject
from app.models.chapter import Chapter


router = APIRouter(
    prefix="/api",
    tags=["Chapters"]
)


@router.get("/subjects/{subject_id}/chapters")
def get_chapters_by_subject(
    subject_id: int,
    db: Session = Depends(get_db)
):
    subject = db.query(Subject).filter(
        Subject.id == subject_id
    ).first()

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found"
        )

    chapters = db.query(Chapter).filter(
        Chapter.subject_id == subject_id
    ).order_by(
        Chapter.chapter_number
    ).all()

    return [
        {
            "id": chapter.id,
            "subject_id": chapter.subject_id,
            "chapter_number": chapter.chapter_number,
            "name": chapter.name,
            "topics": chapter.topics,
            "youtube_url": chapter.youtube_url
        }
        for chapter in chapters
    ]


@router.get("/chapters/{chapter_id}")
def get_chapter(
    chapter_id: int,
    db: Session = Depends(get_db)
):
    chapter = db.query(Chapter).filter(
        Chapter.id == chapter_id
    ).first()

    if not chapter:
        raise HTTPException(
            status_code=404,
            detail="Chapter not found"
        )

    return {
        "id": chapter.id,
        "subject_id": chapter.subject_id,
        "chapter_number": chapter.chapter_number,
        "name": chapter.name,
        "topics": chapter.topics,
        "youtube_url": chapter.youtube_url
    }