"""Create and load the persistent Chroma store for NCERT documents."""

from pathlib import Path

from langchain_chroma import Chroma

try:
	from .document_loader import load_and_split_documents
	from .embeddings import get_embedding_model
except ImportError:
	# This fallback keeps `python rag/vector_store.py` usable from ai/.
	from document_loader import load_and_split_documents
	from embeddings import get_embedding_model


COLLECTION_NAME = "ncert_knowledge"
VECTOR_DB_DIR = Path(__file__).resolve().parent.parent / "vector_db"


def create_vector_store() -> Chroma:
	"""Build and persist a Chroma collection from all NCERT text chunks."""
	documents = load_and_split_documents()
	embedding_model = get_embedding_model()

	# Chroma writes its local collection data into this directory.
	return Chroma.from_documents(
		documents=documents,
		embedding=embedding_model,
		collection_name=COLLECTION_NAME,
		persist_directory=str(VECTOR_DB_DIR),
	)


def get_vector_store() -> Chroma:
	"""Load the existing collection without re-embedding stored documents."""
	if not VECTOR_DB_DIR.exists():
		raise FileNotFoundError(
			f"Persistent vector store not found at {VECTOR_DB_DIR}. "
			"Run create_vector_store() first."
		)

	# The embedding model is supplied for future similarity queries; Chroma
	# loads the persisted vectors instead of recreating document embeddings.
	return Chroma(
		collection_name=COLLECTION_NAME,
		embedding_function=get_embedding_model(),
		persist_directory=str(VECTOR_DB_DIR),
	)


if __name__ == "__main__":
	vector_store = create_vector_store()
	print("Vector store created successfully.")

	try:
		chunk_count = vector_store._collection.count()
		print(f"Number of stored documents/chunks: {chunk_count}")
	except AttributeError:
		print("Number of stored documents/chunks: unavailable")
