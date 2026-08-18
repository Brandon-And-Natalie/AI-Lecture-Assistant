from pathlib import Path

from fastapi import APIRouter, File, Form, UploadFile

router = APIRouter(prefix="/lectures", tags=["lectures"])

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("")
async def upload_lecture(
    title: str = Form(...),
    file: UploadFile = File(...),
):
    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        while chunk := await file.read(1024 * 1024):
            buffer.write(chunk)

    return {
        "title": title,
        "filename": file.filename,
        "content_type": file.content_type,
    }