from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.subject import Subject


router = APIRouter(
    prefix="/api/subjects",
    tags=["Subjects"]
)


@router.get("/")
def get_subjects(
    db: Session = Depends(get_db)
):
    subjects = db.query(Subject).all()

    return [
        {
            "id": subject.id,
            "name": subject.name,
            "student_class": subject.student_class
        }
        for subject in subjects
    ]


@router.get("/{subject_id}")
def get_subject(
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

    return {
        "id": subject.id,
        "name": subject.name,
        "student_class": subject.student_class
    }