from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base


class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)

    chapter_id = Column(
        Integer,
        ForeignKey("chapters.id"),
        nullable=False
    )

    title = Column(String, nullable=False)

    difficulty = Column(
        String,
        nullable=False,
        default="medium"
    )


class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)

    quiz_id = Column(
        Integer,
        ForeignKey("quizzes.id"),
        nullable=False
    )

    question = Column(Text, nullable=False)

    option_a = Column(Text, nullable=False)
    option_b = Column(Text, nullable=False)
    option_c = Column(Text, nullable=False)
    option_d = Column(Text, nullable=False)

    correct_answer = Column(String, nullable=False)

    explanation = Column(Text, nullable=True)


class QuizResult(Base):
    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    quiz_id = Column(
        Integer,
        ForeignKey("quizzes.id"),
        nullable=False
    )

    score = Column(Integer, nullable=False)

    total_questions = Column(
        Integer,
        nullable=False
    )