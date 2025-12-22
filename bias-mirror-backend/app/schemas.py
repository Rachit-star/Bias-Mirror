from pydantic import BaseModel
from typing import List, Dict

class AnalyzeRequest(BaseModel): #this ensures the frontend sends a string 'text' in the request body
    text: str

class Highlight(BaseModel): #structure for each highlighted biased segment
    start: int
    end: int
    label: str
    reason: str
    confidence: float = 1.0  

class AnalyzeResponse(BaseModel): #overall response structure for bias analysis
    original_text: str
    scores: Dict[str, float]
    highlights: List[Highlight]
    suggestions: List[str]