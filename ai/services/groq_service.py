import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
model_name = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")

if not api_key:
    raise ValueError("GROQ_API_KEY not found in .env file")

client = Groq(api_key=api_key)

MODE_INSTRUCTIONS = {
    "Explain Simply": "Explain the answer in very simple language for a Class 10 student. Use short sentences and define difficult terms.",
    "Explain in Detail": "Explain the answer thoroughly, step by step, while staying at an appropriate Class 10-12 level.",
    "Give an Example": "Explain the answer and include one clear example only when it is supported by the supplied study context.",
    "Give a Real-Life Example": "Explain the answer and include one relatable real-life example only when it is supported by the supplied study context.",
    "Summarize": "Give a concise summary using the most important points from the supplied study context.",
}


def ask_groq(context, question, conversation_history=None, mode="Explain Simply"):
    """Answer a question using retrieved context, history, and an explanation mode."""
    if mode not in MODE_INSTRUCTIONS:
        raise ValueError(f"Unsupported explanation mode: {mode}")

    prompt = f"""
You are an AI teaching assistant for an NCERT e-learning platform.

Answer the student's question using ONLY the information provided
in the context below.

If the answer cannot be found in the context, say:
"I couldn't find this information in the provided study material."

{MODE_INSTRUCTIONS[mode]}
Do not add facts that are not present in the supplied context. If the
requested example or detail is not supported by the context, say so clearly.

Context:
{context}

Student Question:
{question}

Answer:
"""

    messages = [
        {
            "role": "system",
            "content": "You are a helpful NCERT teaching assistant. Use only the supplied study context.",
        }
    ]
    messages.extend(conversation_history or [])
    messages.append({"role": "user", "content": prompt})

    response = client.chat.completions.create(
        model=model_name,
        messages=messages,
        temperature=0.2
    )

    return response.choices[0].message.content