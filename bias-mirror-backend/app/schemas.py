from pydantic import BaseModel
from typing import List, Dict, Optional

class AnalyzeRequest(BaseModel):
    text: str

class RewriteRequest(BaseModel):
    text: str
    label: str

class RewriteResponse(BaseModel):
    original: str
    rewritten: str
    label: str

class Highlight(BaseModel):
    start: int
    end: int
    label: str
    reason: str
    confidence: float = 1.0
    secondary_label: Optional[str] = None
    secondary_confidence: Optional[float] = None

class AnalyzeResponse(BaseModel):
    original_text: str
    scores: Dict[str, float]
    highlights: List[Highlight]
    suggestions: List[str]
    dominant_label: str
    dominant_confidence: float