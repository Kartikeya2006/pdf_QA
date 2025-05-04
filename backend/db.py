from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from models import Base, PDFMetadata

engine = create_engine("sqlite:///pdfs.db")
Session = sessionmaker(bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def save_pdf_metadata(filename: str):
    session = Session()
    exists = session.query(PDFMetadata).filter_by(filename=filename).first()
    if exists:
        session.close()
        return  
    pdf = PDFMetadata(filename=filename)
    session.add(pdf)
    try:
        session.commit()
    except IntegrityError:
        session.rollback()
    finally:
        session.close()
