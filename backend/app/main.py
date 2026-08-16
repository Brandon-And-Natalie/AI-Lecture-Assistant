from fastapi import FastAPI

app = FastAPI(title="AI Lecture Assistant API")


@app.get("/")
def root():
    return {"message": "AI Lecture Assistant API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}