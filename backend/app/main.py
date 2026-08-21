from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.user import User
from app.models.subject import Subject
from app.models.chapter import Chapter
from app.models.flashcard import Flashcard
from app.models.quiz import Quiz, QuizQuestion, QuizResult
from app.models.progress import ChapterProgress, FlashcardProgress

from app.routes.auth import router as auth_router
from app.routes.subjects import router as subjects_router
from app.routes.chapters import router as chapters_router
from app.routes.flashcards import router as flashcards_router
from app.routes.quiz import router as quiz_router
from app.routes.progress import router as progress_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI Teaching Website API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(subjects_router)
app.include_router(chapters_router)
app.include_router(flashcards_router)
app.include_router(quiz_router)
app.include_router(progress_router)


@app.get("/")
def root():
    return {
        "message": "AI Teaching Website Backend is running!"
    }