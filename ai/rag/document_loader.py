"""Load and split NCERT text documents for the local RAG pipeline."""

from pathlib import Path

from langchain_community.document_loaders import TextLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


DOCUMENTS_DIR = Path(__file__).resolve().parent.parent / "documents"


def _document_metadata(file_path: Path) -> dict[str, str]:
	"""Build useful metadata from a path below the documents directory."""
	relative_parts = file_path.relative_to(DOCUMENTS_DIR).parts

	metadata = {
		"source": str(file_path),
		"class": relative_parts[0] if len(relative_parts) > 0 else "",
		"subject": relative_parts[1] if len(relative_parts) > 1 else "",
		"chapter": file_path.stem,
	}
	return metadata


def load_and_split_documents() -> list[Document]:
	"""Load every TXT file under documents and return split LangChain documents."""
	text_splitter = RecursiveCharacterTextSplitter(
		chunk_size=1000,
		chunk_overlap=200,
	)
	chunks: list[Document] = []

	for file_path in sorted(DOCUMENTS_DIR.rglob("*.txt")):
		# TextLoader handles decoding and creates LangChain Document objects.
		loaded_documents = TextLoader(
			str(file_path),
			encoding="utf-8",
		).load()
		metadata = _document_metadata(file_path)

		for document in loaded_documents:
			document.metadata.update(metadata)

		chunks.extend(text_splitter.split_documents(loaded_documents))

	return chunks


if __name__ == "__main__":
	document_chunks = load_and_split_documents()
	print(f"Total number of chunks: {len(document_chunks)}")

	if document_chunks:
		print("\nFirst chunk content:")
		print(document_chunks[0].page_content)
		print("\nFirst chunk metadata:")
		print(document_chunks[0].metadata)
	else:
		print("No .txt documents were found.")
