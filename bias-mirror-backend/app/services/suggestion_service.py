SUGGESTIONS = {
    "gender": [
        "Try replacing gendered assumptions with neutral alternatives.",
        "Avoid attributing traits or roles based on gender.",
        "Consider whether the same statement would be made about a different gender.",
    ],
    "racial": [
        "Focus on individual actions or behaviors rather than nationality or background.",
        "Avoid generalizations that attribute traits to an entire ethnic or cultural group.",
        "Be mindful of backhanded compliments that imply low expectations based on race or origin.",
    ],
    "toxic": [
        "Consider rephrasing to be more constructive and respectful.",
        "Remove aggressive, dismissive, or inflammatory language.",
        "Focus on the issue rather than attacking the person.",
    ],
    "political": [
        "Ensure political references are neutral and based on facts.",
        "Avoid dismissing people based solely on their political beliefs.",
        "Try to engage with the argument rather than the political identity.",
    ],
    "neutral": [],
}

def build_suggestions(scores: dict) -> list:
    if not scores:
        return []
    dominant = max(scores, key=scores.get)
    return list(SUGGESTIONS.get(dominant, []))