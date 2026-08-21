from app.database import SessionLocal
from app.models.subject import Subject
from app.models.chapter import Chapter
from app.models.flashcard import Flashcard
from app.models.quiz import Quiz, QuizQuestion


def seed_database():
    db = SessionLocal()

    try:
        # -------------------------
        # SUBJECTS
        # -------------------------

        physics = Subject(
            name="Physics",
            student_class="12"
        )

        chemistry = Subject(
            name="Chemistry",
            student_class="12"
        )

        db.add_all([
            physics,
            chemistry
        ])

        db.commit()

        db.refresh(physics)
        db.refresh(chemistry)

        # -------------------------
        # CHAPTERS
        # -------------------------

        physics_chapter = Chapter(
            subject_id=physics.id,
            chapter_number=1,
            name="Electric Charges and Fields",
            topics="Electric charge, Coulomb's law, electric field, electric flux",
            youtube_url="https://www.youtube.com/"
        )

        chemistry_chapter = Chapter(
            subject_id=chemistry.id,
            chapter_number=1,
            name="Solutions",
            topics="Types of solutions, concentration, solubility, molarity",
            youtube_url="https://www.youtube.com/"
        )

        db.add_all([
            physics_chapter,
            chemistry_chapter
        ])

        db.commit()

        db.refresh(physics_chapter)
        db.refresh(chemistry_chapter)

        # -------------------------
        # FLASHCARDS
        # -------------------------

        flashcards = [
            Flashcard(
                chapter_id=physics_chapter.id,
                front="What is electric charge?",
                back="Electric charge is a fundamental property of matter responsible for electrical interactions."
            ),
            Flashcard(
                chapter_id=physics_chapter.id,
                front="What is Coulomb's law?",
                back="Coulomb's law describes the electrostatic force between two point charges."
            ),
            Flashcard(
                chapter_id=chemistry_chapter.id,
                front="What is molarity?",
                back="Molarity is the number of moles of solute present in one litre of solution."
            ),
            Flashcard(
                chapter_id=chemistry_chapter.id,
                front="What is a solution?",
                back="A solution is a homogeneous mixture of two or more substances."
            )
        ]

        db.add_all(flashcards)
        db.commit()

        # -------------------------
        # QUIZ
        # -------------------------

        physics_quiz = Quiz(
            chapter_id=physics_chapter.id,
            title="Electric Charges and Fields Quiz",
            difficulty="medium"
        )

        chemistry_quiz = Quiz(
            chapter_id=chemistry_chapter.id,
            title="Solutions Quiz",
            difficulty="medium"
        )

        db.add_all([
            physics_quiz,
            chemistry_quiz
        ])

        db.commit()

        db.refresh(physics_quiz)
        db.refresh(chemistry_quiz)

        # -------------------------
        # QUIZ QUESTIONS
        # -------------------------

        questions = [
            QuizQuestion(
                quiz_id=physics_quiz.id,
                question="What is the SI unit of electric charge?",
                option_a="Volt",
                option_b="Coulomb",
                option_c="Ampere",
                option_d="Ohm",
                correct_answer="B",
                explanation="The SI unit of electric charge is the coulomb."
            ),
            QuizQuestion(
                quiz_id=physics_quiz.id,
                question="Which law gives the force between two point charges?",
                option_a="Ohm's law",
                option_b="Newton's law",
                option_c="Coulomb's law",
                option_d="Faraday's law",
                correct_answer="C",
                explanation="Coulomb's law gives the electrostatic force between two point charges."
            ),
            QuizQuestion(
                quiz_id=chemistry_quiz.id,
                question="Molarity is expressed as:",
                option_a="Moles per litre",
                option_b="Grams per litre",
                option_c="Litres per mole",
                option_d="Moles per gram",
                correct_answer="A",
                explanation="Molarity is the number of moles of solute per litre of solution."
            ),
            QuizQuestion(
                quiz_id=chemistry_quiz.id,
                question="A solution is a:",
                option_a="Heterogeneous mixture",
                option_b="Pure substance",
                option_c="Homogeneous mixture",
                option_d="Compound only",
                correct_answer="C",
                explanation="A solution is a homogeneous mixture of two or more substances."
            )
        ]

        db.add_all(questions)
        db.commit()

        print("Database seeded successfully!")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()