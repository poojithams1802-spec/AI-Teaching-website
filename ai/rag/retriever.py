"""Retrieve relevant NCERT document chunks from the persisted Chroma store."""

from langchain_core.documents import Document

try:
	from .vector_store import get_vector_store
except ImportError:
	# This fallback keeps `python rag/retriever.py` usable from ai/.
	from vector_store import get_vector_store


RETRIEVAL_COUNT = 3


def create_retriever():
	"""Load the persisted vector store and configure top-3 similarity search."""
	vector_store = get_vector_store()

	# Retrieval compares the question embedding with stored chunk embeddings;
	# it does not recreate or re-embed the source documents.
	return vector_store.as_retriever(
		search_type="similarity",
		search_kwargs={"k": RETRIEVAL_COUNT},
	)


def retrieve_documents(query: str) -> list[Document]:
	"""Return the three most relevant persisted NCERT chunks for a question."""
	retriever = create_retriever()
	return retriever.invoke(query)


if __name__ == "__main__":
	question = "What is Euclid's division lemma?"
	retrieved_documents = retrieve_documents(question)

	print(f"Number of retrieved documents: {len(retrieved_documents)}")
	for index, document in enumerate(retrieved_documents, start=1):
		print(f"\nDocument {index} content:")
		print(document.page_content)
		print(f"Document {index} metadata:")
		print(document.metadata)
