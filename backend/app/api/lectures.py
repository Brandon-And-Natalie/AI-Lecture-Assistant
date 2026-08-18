from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

router = APIRouter(prefix="/lectures", tags=["lectures"])

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {".mp3", ".wav", ".m4a"}
MAX_FILE_SIZE = 500 * 1024 * 1024  # 500 MB


@router.post("")
async def upload_lecture(
    title: str = Form(...),
    file: UploadFile = File(...),
):
    # Check that the file has a filename
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No filename provided",
        )

    # Check the file extension
    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload an MP3, WAV, or M4A file.",
        )

    # Generate a unique filename
    unique_filename = f"{uuid4()}{extension}"
    file_path = UPLOAD_DIR / unique_filename

    # Save the file in chunks
    file_size = 0

    with file_path.open("wb") as buffer:
        while chunk := await file.read(1024 * 1024):
            file_size += len(chunk)

            if file_size > MAX_FILE_SIZE:
                file_path.unlink(missing_ok=True)

                raise HTTPException(
                    status_code=400,
                    detail="File is too large. Maximum size is 500 MB.",
                )

            buffer.write(chunk)

    return {
        "title": title,
        "filename": unique_filename,
        "original_filename": file.filename,
        "content_type": file.content_type,
        "size": file_size,
    }