from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.lectures import router as lectures_router

app = FastAPI(title="AI Lecture Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lectures_router)


@app.get("/")
def root():
    return {"message": "AI Lecture Assistant API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}