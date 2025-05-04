from llama_index.core import SimpleDirectoryReader, GPTVectorStoreIndex, StorageContext, load_index_from_storage
import os

INDEX_ROOT = "indices"
os.makedirs(INDEX_ROOT, exist_ok=True)

class QAEngine:
    def __init__(self):
        self.indices = {}
        
        for folder in os.listdir(INDEX_ROOT):
            folder_path = os.path.join(INDEX_ROOT, folder)
            if os.path.isdir(folder_path):
                storage_ctx = StorageContext.from_defaults(persist_dir=folder_path)
                index = load_index_from_storage(storage_ctx)
                self.indices[folder] = index
                print(f"[QAEngine] Loaded index for {folder}")

    def index_pdf_text(self, filename, text):
        temp_path = f"temp_{filename}.txt"
        with open(temp_path, "w") as f:
            f.write(text)

        reader = SimpleDirectoryReader(input_files=[temp_path])
        docs = reader.load_data()
        index = GPTVectorStoreIndex.from_documents(docs)

        folder_path = os.path.join(INDEX_ROOT, filename)
        os.makedirs(folder_path, exist_ok=True)
        index.storage_context.persist(persist_dir=folder_path)
        print(f"[QAEngine] Persisted index to {folder_path}")

        self.indices[filename] = index

        os.remove(temp_path)

    def answer_question(self, filename, question):
        index = self.indices.get(filename)
        if index is None:
            return "No index found for this file."

        query_engine = index.as_query_engine()
        response = query_engine.query(question)
        return response.response  
