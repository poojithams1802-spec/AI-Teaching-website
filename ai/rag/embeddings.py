"""Local Hugging Face embeddings used by the NCERT RAG pipeline."""

from langchain_community.embeddings import HuggingFaceEmbeddings


MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


def get_embedding_model() -> HuggingFaceEmbeddings:
	"""Return the locally running Sentence Transformers embedding model.

	Embeddings convert text into numeric vectors that capture semantic meaning.
	Similar questions and document chunks can then be compared by vector
	similarity during retrieval. The model is downloaded and cached locally by
	Sentence Transformers; no provider API key is required.
	"""
	return HuggingFaceEmbeddings(
		model_name=MODEL_NAME,
		model_kwargs={"device": "cpu"},
		encode_kwargs={"normalize_embeddings": True},
	)


if __name__ == "__main__":
	embedding_model = get_embedding_model()
	vector = embedding_model.embed_query("What is photosynthesis?")

	print(f"Embedding vector length: {len(vector)}")
	print(f"First 5 values: {vector[:5]}")
