"""Generate grounded flashcards from retrieved NCERT material."""

import json
import re
from typing import Any

from rag.retriever import retrieve_documents
from services.groq_service import client, model_name

DIFFICULTIES = {"Easy", "Medium", "Hard"}
FLASHCARD_COUNT = 10


def _extract_json(response_text: str) -> dict[str, Any]:
    """Parse JSON returned directly or inside a Markdown code fence."""
    cleaned = response_text.strip()
    fenced_match = re.search(r"```(?:json)?\s*(.*?)\s*```", cleaned, re.DOTALL | re.IGNORECASE)
    if fenced_match:
        cleaned = fenced_match.group(1)
    return json.loads(cleaned)


def _validate_flashcards(payload: dict[str, Any]) -> list[dict[str, str]]:
    """Validate the stable flashcard shape before returning it to a frontend."""
    cards = payload.get("flashcards")
    if not isinstance(cards, list) or len(cards) != FLASHCARD_COUNT:
        raise ValueError(f"Expected exactly {FLASHCARD_COUNT} flashcards.")

    validated_cards = []
    for index, card in enumerate(cards, start=1):
        if not isinstance(card, dict):
            raise ValueError(f"Flashcard {index} is not an object.")
        question = card.get("question")
        answer = card.get("answer")
        if not isinstance(question, str) or not question.strip():
            raise ValueError(f"Flashcard {index} is missing its question or term.")
        if not isinstance(answer, str) or not answer.strip():
            raise ValueError(f"Flashcard {index} is missing its answer or explanation.")
        validated_cards.append({"question": question.strip(), "answer": answer.strip()})

    return validated_cards


def generate_flashcards(topic: str, difficulty: str = "Medium") -> list[dict[str, str]]:
    """Retrieve NCERT context and generate ten grounded flashcards."""
    topic = topic.strip()
    if not topic:
        raise ValueError("A topic is required to generate flashcards.")
    if difficulty not in DIFFICULTIES:
        raise ValueError(f"Difficulty must be one of: {', '.join(sorted(DIFFICULTIES))}.")

    documents = retrieve_documents(topic)
    if not documents:
        raise ValueError("No relevant NCERT study material was found for this topic.")

    context = "\n\n".join(document.page_content for document in documents)
    prompt = f"""You create flashcards for an NCERT Class 10-12 learning platform.

Use ONLY the NCERT study material inside CONTEXT. Do not use outside facts.
Generate exactly ten {difficulty} flashcards about this topic:
{topic}

Each card must have a question or term on the front and a concise answer or
student-friendly explanation on the back. Every answer must be directly
supported by CONTEXT. If the context does not support a card, do not create it.

Return ONLY valid JSON in this shape:
{{
  "flashcards": [
    {{
      "question": "Question or term",
      "answer": "Answer or explanation"
    }}
  ]
}}

Keep explanations appropriate for Class 10-12 students and avoid introducing
facts that are not present in CONTEXT.

CONTEXT:
{context}
"""

    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {
                "role": "system",
                "content": "Generate only grounded NCERT flashcard JSON. Never invent information beyond the supplied context.",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.2,
        response_format={"type": "json_object"},
    )
    payload = _extract_json(response.choices[0].message.content)
    return _validate_flashcards(payload)


if __name__ == "__main__":
    selected_topic = input("Topic: ").strip()
    selected_difficulty = input("Difficulty (Easy, Medium, Hard): ").strip() or "Medium"
    generated_cards = generate_flashcards(selected_topic, selected_difficulty)
    print(json.dumps({"flashcards": generated_cards}, indent=2, ensure_ascii=False))
