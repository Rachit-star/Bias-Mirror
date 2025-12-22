#this file defines the API endpoints for analyzing text bias which frontend talks to

from fastapi import APIRouter #grouping related API endpoints
from app.schemas import AnalyzeRequest #input data structure
from app.services.analyze_service import analyze_text #core analysis logic

router = APIRouter() #create a router for analyze-related endpoints,endpoint grouping


@router.post("/analyze")
def analyze(payload: AnalyzeRequest): #POST endpoint to analyze text bias
    result = analyze_text(payload.text)
    return result