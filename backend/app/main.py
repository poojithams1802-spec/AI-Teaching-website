from fastapi import FastAPI
from app.database import Base, engine
from app.models.user import User

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Teaching Website API")


@app.get("/")
def root():
    return {"message": "AI Teaching Website Backend is running!"}