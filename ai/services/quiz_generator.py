"""Generate grounded multiple-choice quizzes from retrieved NCERT material."""

import json
import re
from typing import Any

from rag.retriever import retrieve_documents
from services.groq_service import client, model_name

DIFFICULTIES = {"Easy", "Medium", "Hard"}
QUESTION_COUNT = 5


def _extract_json(response_text: str) -> dict[str, Any]:
    """Parse JSON returned directly or inside a Markdown code fence."""
    cleaned = response_text.strip()
    fenced_match = re.search(r"```(?:json)?\s*(.*?)\s*```", cleaned, re.DOTALL | re.IGNORECASE)
    if fenced_match:
        cleaned = fenced_match.group(1)
    return json.loads(cleaned)


def _validate_quiz(payload: dict[str, Any]) -> list[dict[str, Any]]:
    """Validate the stable quiz shape before returning it to a frontend."""
    questions = payload.get("questions")
    if not isinstance(questions, list) or len(questions) != QUESTION_COUNT:
        raise ValueError(f"Expected exactly {QUESTION_COUNT} quiz questions.")

    for index, question in enumerate(questions, start=1):
        if not isinstance(question, dict):
            raise ValueError(f"Question {index} is not an object.")
        if not isinstance(question.get("question"), str) or not question["question"].strip():
            raise ValueError(f"Question {index} is missing question text.")
        options = question.get("options")
        if not isinstance(options, list) or len(options) != 4 or not all(isinstance(option, str) for option in options):
            raise ValueError(f"Question {index} must contain exactly four text options.")
        correct_answer = question.get("correct_answer")
        if not isinstance(correct_answer, int) or not 0 <= correct_answer < 4:
            raise ValueError(f"Question {index} must have a zero-based correct_answer index.")
        if not isinstance(question.get("explanation"), str) or not question["explanation"].strip():
            raise ValueError(f"Question {index} is missing an explanation.")

    return questions


def generate_quiz(topic: str, difficulty: str = "Medium") -> list[dict[str, Any]]:
    """Retrieve NCERT context and generate five grounded quiz questions."""
    topic = topic.strip()
    if not topic:
        raise ValueError("A topic is required to generate a quiz.")
    if difficulty not in DIFFICULTIES:
        raise ValueError(f"Difficulty must be one of: {', '.join(sorted(DIFFICULTIES))}.")

    documents = retrieve_documents(topic)
    if not documents:
        raise ValueError("No relevant NCERT study material was found for this topic.")

    context = "\n\n".join(document.page_content for document in documents)
    prompt = f"""You generate quizzes for an NCERT Class 10-12 learning platform.

Use ONLY the NCERT study material inside CONTEXT. Do not use outside facts.
If a question, answer, or explanation cannot be supported by CONTEXT, do not
create it. Generate exactly five {difficulty} multiple-choice questions about:
{topic}

Return ONLY valid JSON in this shape:
{{
  "questions": [
    {{
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct_answer": 0,
      "explanation": "..."
    }}
  ]
}}

`correct_answer` must be a zero-based option index from 0 to 3.
Each explanation must be short and directly supported by CONTEXT.

CONTEXT:
{context}
"""

    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {
                "role": "system",
                "content": "Generate only grounded NCERT quiz JSON. Never invent information beyond the supplied context.",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.2,
        response_format={"type": "json_object"},
    )
    payload = _extract_json(response.choices[0].message.content)
    return _validate_quiz(payload)


if __name__ == "__main__":
    selected_topic = input("Topic: ").strip()
    selected_difficulty = input("Difficulty (Easy, Medium, Hard): ").strip() or "Medium"
    generated_questions = generate_quiz(selected_topic, selected_difficulty)
    print(json.dumps({"questions": generated_questions}, indent=2, ensure_ascii=False))
