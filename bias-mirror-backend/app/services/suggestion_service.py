# app/services/suggestion_service.py

# --- 1. Define the dictionary FIRST ---
SUGGESTIONS = {
    "gender": [
        "Try replacing gendered terms (he/she) with neutral ones (they/them/the user).",
        "Avoid assuming roles based on gender."
    ],
    "cultural": [
        "Focus on actions or behaviors rather than nationality or background.",
        "Avoid generalizations that attribute traits to a specific group."
    ],
    "toxic": [
        "Consider softening the tone to be more constructive.",
        "Remove aggressive or inflammatory language."
    ],
    "bias": [
        "Review the text for subjective assumptions.",
        "Ensure the statement relies on facts rather than opinions."
    ],
    "political": [
        "Ensure political references are neutral and relevant.",
        "Avoid inflammatory political rhetoric."
    ],
    "stereotype": [
        "Avoid relying on social stereotypes.",
        "Focus on individual characteristics rather than group generalizations."
    ],
    "emotional": [
        "Avoid describing individuals as overly 'emotional' when 'passionate' or 'expressive' might be more accurate.",
        "Focus on the substance of the argument rather than the tone."
    ],
    "neutral": []
}

# --- 2. Define the function SECOND ---
def build_suggestions(label_or_scores, text=""):
    """
    Returns a list of suggestions based on the detected label.
    Accepts either a string (label) OR a dictionary (scores).
    """
    # Determine the dominant label
    if isinstance(label_or_scores, dict):
        label = max(label_or_scores, key=label_or_scores.get)
    else:
        label = label_or_scores

    # Get generic suggestions (create a copy so we don't modify the original)
    suggestions = list(SUGGESTIONS.get(label, []))

    # Add specific advice if "emotional" is detected in a gender context
    if label == "gender" and "emotional" in text.lower():
        suggestions.append("Avoid describing women as 'emotional'; consider 'passionate' or 'expressive' if relevant.")

    return suggestions