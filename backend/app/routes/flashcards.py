from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.chapter import Chapter
from app.models.flashcard import Flashcard


router = APIRouter(
    prefix="/api",
    tags=["Flashcards"]
)


@router.get("/chapters/{chapter_id}/flashcards")
def get_flashcards(
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

    flashcards = db.query(Flashcard).filter(
        Flashcard.chapter_id == chapter_id
    ).all()

    return [
        {
            "id": flashcard.id,
            "chapter_id": flashcard.chapter_id,
            "front": flashcard.front,
            "back": flashcard.back
        }
        for flashcard in flashcards
    ]