from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class PDFMetadata(Base):
    __tablename__ = "pdfs"

    id = Column(Integer, primary_key=True)
    filename = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
