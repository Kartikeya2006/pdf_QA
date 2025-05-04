from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pdf_processor import extract_text_from_pdf
from qa_engine import QAEngine
from db import init_db, save_pdf_metadata
import os

app = FastAPI()
init_db()
qa_engine = QAEngine()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   
    allow_credentials=True,       
    allow_methods=["*"],          
    allow_headers=["*"],          
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    print('--------------')
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(file_location)
    qa_engine.index_pdf_text(file.filename, text)
    save_pdf_metadata(file.filename)

    return {"message": "Uploaded successfully", "filename": file.filename}

@app.post("/ask")
async def ask_question(filename: str = Form(...), question: str = Form(...)):
    print(filename)
    answer = qa_engine.answer_question(filename, question)
    print(answer)
    return {"answer": answer}
