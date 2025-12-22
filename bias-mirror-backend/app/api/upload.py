from fastapi import APIRouter, UploadFile, File
from app.services.model_service import analyze_text

router = APIRouter()

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    content = (await file.read()).decode("utf-8", errors="ignore")
    return analyze_text(content)
