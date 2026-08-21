from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.database import get_db
from app.models.user import User
from app.models.chapter import Chapter
from app.models.quiz import QuizResult
from app.models.progress import ChapterProgress, FlashcardProgress
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api", tags=["Progress"])


class ProgressUpdateRequest(BaseModel):
    chapter_id: int
    completion_percentage: float
    quiz_score: Optional[float] = 0.0
    completed: Optional[bool] = False


@router.get("/users/{user_id}/progress")
def get_user_progress(
    user_id: int,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user_id != current_user:
        raise HTTPException(
            status_code=403,
            detail="You can only view your own progress"
        )

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    chapter_progress = db.query(ChapterProgress).filter(
        ChapterProgress.user_id == user_id
    ).all()

    flashcard_progress = db.query(FlashcardProgress).filter(
        FlashcardProgress.user_id == user_id
    ).all()

    quiz_results = db.query(QuizResult).filter(
        QuizResult.user_id == user_id
    ).all()

    return {
        "user_id": user_id,
        "chapter_progress": [
            {
                "chapter_id": item.chapter_id,
                "completion_percentage": item.completion_percentage,
                "quiz_score": item.quiz_score,
                "completed": item.completed,
                "last_accessed": item.last_accessed
            }
            for item in chapter_progress
        ],
        "flashcard_progress": [
            {
                "flashcard_id": item.flashcard_id,
                "reviewed": item.reviewed,
                "review_count": item.review_count,
                "last_reviewed": item.last_reviewed
            }
            for item in flashcard_progress
        ],
        "quiz_results": [
            {
                "quiz_id": result.quiz_id,
                "score": result.score,
                "total_questions": result.total_questions
            }
            for result in quiz_results
        ]
    }


@router.put("/users/{user_id}/progress")
def update_user_progress(
    user_id: int,
    progress_data: ProgressUpdateRequest,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user_id != current_user:
        raise HTTPException(
            status_code=403,
            detail="You can only update your own progress"
        )

    chapter = db.query(Chapter).filter(
        Chapter.id == progress_data.chapter_id
    ).first()

    if not chapter:
        raise HTTPException(
            status_code=404,
            detail="Chapter not found"
        )

    progress = db.query(ChapterProgress).filter(
        ChapterProgress.user_id == user_id,
        ChapterProgress.chapter_id == progress_data.chapter_id
    ).first()

    if not progress:
        progress = ChapterProgress(
            user_id=user_id,
            chapter_id=progress_data.chapter_id
        )
        db.add(progress)

    progress.completion_percentage = max(
        0,
        min(100, progress_data.completion_percentage)
    )

    progress.quiz_score = max(
        0,
        min(100, progress_data.quiz_score or 0)
    )

    progress.completed = progress_data.completed

    db.commit()
    db.refresh(progress)

    return {
        "message": "Progress updated successfully",
        "user_id": user_id,
        "chapter_id": progress.chapter_id,
        "completion_percentage": progress.completion_percentage,
        "quiz_score": progress.quiz_score,
        "completed": progress.completed
    }