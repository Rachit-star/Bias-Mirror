
REASON_MAP = {
    "gender": "Gender-based generalization or assumption.",
    "cultural": "Cultural or ethnic stereotyping detected.",
    "political": "Politically biased or opinionated language.",
    "stereotype": "Use of stereotypes toward a group.",
    "toxic": "Hostile or abusive language detected.",
    "emotional": "Emotion-based labeling or dismissal."
}

THRESHOLD = 0.55

def build_highlights(text: str, sentence_results: list):
    """
    sentence_results: List of dicts like:
    {
        "start": int,
        "end": int,
        "label": str,
        "confidence": float
    }
    """
    highlights = []

    for s in sentence_results:
        label = s["label"]
        confidence = s["confidence"]

        if label != "neutral" and confidence >= THRESHOLD:
            highlights.append({
                "start": s["start"],
                "end": s["end"],
                "label": label,
                "confidence": round(confidence, 3),
                "reason": REASON_MAP.get(label, "Potential bias detected.")
            })

    return highlights
