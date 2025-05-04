# PDF Q&A App

This is a full-stack web application that allows users to upload PDFs and ask questions based on the content inside them. It uses **Next.js** for the frontend and **FastAPI** (Python) for the backend, powered by **LangChain/LlamaIndex** for intelligent document-based question answering.

---

## 🚀 Features

- 📄 **PDF Upload**: Upload one or more PDF documents for analysis.
- 🤖 **AI Q&A**: Ask any question related to the uploaded PDF using LangChain/LlamaIndex.
- 🧠 **Contextual Answers**: Receive accurate answers grounded in the document contents.

---

## 🎥 Video Demonstration

Click [here](https://drive.google.com/file/d/1VxUHj-0iIkKa6BsvXuzPQiYApE0UvZpc/view?usp=sharing ) to view a short demo of the application.

---

## 🖥️ Frontend

### 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) — Full-stack React framework for building modern web apps  
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework   

### ⚙️ Local Installation

Ensure Node.js is installed: [Download Node.js](https://nodejs.org/en), and clone repository using `git clone https://github.com/Kartikeya2006/pdf_QA.git`

1. Go to Frontend Directory:

    ```
    cd frontend/qa_pdf
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

The app should now be running at `http://localhost:3000`.

---

## 🧠 Backend

### 🛠️ Technologies Used

- [FastAPI](https://fastapi.tiangolo.com/) or [Flask](https://flask.palletsprojects.com/) — Python web framework  
- [LangChain](https://www.langchain.com/) / [LlamaIndex](https://www.llamaindex.ai/) — Q&A over PDFs  
- [PyMuPDF](https://pymupdf.readthedocs.io/) — PDF content extraction  
- [Uvicorn](https://www.uvicorn.org/) — ASGI server  

### ⚙️ Installation

Make sure Python 3.9+ is installed: [Download Python](https://www.python.org/)

1. Go the Backend Directory:

    ```
    cd backend
    ```

2. Create and activate a virtual environment (On Bash):

    ```bash
    python -m venv venv
    source venv/bin/activate 
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Create a `.env` file for backend secrets:

    ```env
    OPENAI_API_KEY=your-api-key
    ```

5. Start the server:

    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

API will be running at `http://localhost:8000`

## 🌐 Deployment

- **Frontend**: Deployed to [Vercel](https://pdf-qa-coral.vercel.app/)
- **Backend**: Deployed on AWS EC2

