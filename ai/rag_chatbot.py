from rag.vector_store import VECTOR_DB_DIR, get_vector_store
from services.groq_service import MODE_INSTRUCTIONS, ask_groq

# Load the named persisted collection created by rag/vector_store.py.
vectorstore = get_vector_store()
print(f"Vector-store path: {VECTOR_DB_DIR}")
print(f"Stored documents/chunks: {vectorstore._collection.count()}")


# Create retriever
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}
)

conversation_history = []


def clear_history():
    """Reset the in-memory conversation for the current chatbot session."""
    conversation_history.clear()


def _retrieval_query(question):
    """Add recent user turns so short follow-ups retrieve the right topic."""
    recent_questions = [
        message["content"]
        for message in conversation_history
        if message["role"] == "user"
    ][-2:]
    return "\n".join([*recent_questions, question])


def rag_chat(question, mode="Explain Simply"):

    documents = retriever.invoke(_retrieval_query(question))

    print("\n--- Retrieved Documents ---")

    for i, document in enumerate(documents):
        print(f"\nDocument {i + 1}:")
        print(document.page_content[:500])

    print(f"\nRetrieved documents: {len(documents)}")

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    answer = ask_groq(context, question, conversation_history, mode)
    conversation_history.extend([
        {"role": "user", "content": question},
        {"role": "assistant", "content": answer},
    ])

    return answer


if __name__ == "__main__":
    print("Available modes: " + ", ".join(MODE_INSTRUCTIONS))
    selected_mode = input("Choose a mode (press Enter for Explain Simply): ").strip()
    if not selected_mode:
        selected_mode = "Explain Simply"
    if selected_mode not in MODE_INSTRUCTIONS:
        print("Unknown mode; using Explain Simply.")
        selected_mode = "Explain Simply"
    print("Type 'clear' to reset the conversation or 'exit' to quit.")

    while True:
        question = input("\nAsk a question: ").strip()
        if question.lower() == "exit":
            break
        if question.lower() == "clear":
            clear_history()
            print("Conversation history cleared.")
            continue
        if not question:
            continue

        print("\nAI:")
        print(rag_chat(question, selected_mode))