from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from app.database import get_db
from app.models.quiz import Quiz, QuizQuestion, QuizResult
from app.models.chapter import Chapter
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api", tags=["Quiz"])


class QuizAnswer(BaseModel):
    question_id: int
    answer: str


class QuizSubmitRequest(BaseModel):
    answers: List[QuizAnswer]


@router.get("/chapters/{chapter_id}/quiz")
def get_quiz(
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

    quiz = db.query(Quiz).filter(
        Quiz.chapter_id == chapter_id
    ).first()

    if not quiz:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found for this chapter"
        )

    questions = db.query(QuizQuestion).filter(
        QuizQuestion.quiz_id == quiz.id
    ).all()

    return {
        "id": quiz.id,
        "chapter_id": quiz.chapter_id,
        "title": quiz.title,
        "difficulty": quiz.difficulty,
        "questions": [
            {
                "id": q.id,
                "question": q.question,
                "option_a": q.option_a,
                "option_b": q.option_b,
                "option_c": q.option_c,
                "option_d": q.option_d
            }
            for q in questions
        ]
    }


@router.post("/quiz/{quiz_id}/submit")
def submit_quiz(
    quiz_id: int,
    submission: QuizSubmitRequest,
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    quiz = db.query(Quiz).filter(
        Quiz.id == quiz_id
    ).first()

    if not quiz:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found"
        )

    questions = db.query(QuizQuestion).filter(
        QuizQuestion.quiz_id == quiz_id
    ).all()

    if not questions:
        raise HTTPException(
            status_code=404,
            detail="No questions found for this quiz"
        )

    answer_map = {
        answer.question_id: answer.answer.strip().lower()
        for answer in submission.answers
    }

    score = 0
    question_results = []

    for question in questions:
        submitted_answer = answer_map.get(question.id, "")
        correct_answer = question.correct_answer.strip().lower()

        is_correct = submitted_answer == correct_answer

        if is_correct:
            score += 1

        question_results.append({
            "question_id": question.id,
            "submitted_answer": submitted_answer,
            "correct_answer": question.correct_answer,
            "is_correct": is_correct,
            "explanation": question.explanation
        })

    total_questions = len(questions)

    result = QuizResult(
        user_id=user_id,
        quiz_id=quiz_id,
        score=score,
        total_questions=total_questions
    )

    db.add(result)
    db.commit()
    db.refresh(result)

    percentage = (
        score / total_questions * 100
        if total_questions else 0
    )

    return {
        "message": "Quiz submitted successfully",
        "result_id": result.id,
        "quiz_id": quiz_id,
        "score": score,
        "total_questions": total_questions,
        "percentage": percentage,
        "questions": question_results
    }