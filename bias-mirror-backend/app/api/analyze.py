from fastapi import APIRouter, HTTPException
from app.schemas import AnalyzeRequest, RewriteRequest, RewriteResponse
from app.services.analyze_service import analyze_text
from app.services.rewrite_service import rewrite_text

router = APIRouter()

@router.post("/analyze")
def analyze(payload: AnalyzeRequest):
    return analyze_text(payload.text)

@router.post("/rewrite", response_model=RewriteResponse)
def rewrite(payload: RewriteRequest):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    valid_labels = {"gender", "racial", "political", "toxic"}
    if payload.label not in valid_labels:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid label. Must be one of: {valid_labels}"
        )

    try:
        rewritten = rewrite_text(payload.text, payload.label)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Rewrite service unavailable: {str(e)}")

    return RewriteResponse(
        original=payload.text,
        rewritten=rewritten,
        label=payload.label,
    )