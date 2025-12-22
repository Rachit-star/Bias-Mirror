from app.utils.text_splitter import split_into_sentences
from app.services.model_service import run_model
from app.services.suggestion_service import build_suggestions
from app.services.highlight_service import REASON_MAP

THRESHOLD = 0.6  # confidence needed for highlighting

def analyze_text(text: str):
    sentences = split_into_sentences(text)

    if not sentences:
        return {
            "original_text": text,
            "scores": {},
            "highlights": [],
            "suggestions": []
        }

    highlights = []
    agg_scores = {}

    for sentence, start, end in sentences: #runs model on each sentence and aggregates scores
        scores = run_model(sentence)

        # initialize aggregation keys
        for label in scores:
            agg_scores.setdefault(label, 0.0)

        # accumulate scores
        for label, value in scores.items():
            agg_scores[label] += value

        # dominant bias for this sentence
        top_label, top_conf = max(scores.items(), key=lambda x: x[1])

        if top_label != "neutral" and top_conf >= THRESHOLD:
            highlights.append({
                "start": start,
                "end": end,
                "label": top_label,
                "confidence": round(top_conf, 3),
                "reason": REASON_MAP.get(top_label, "Potential bias detected.")
            })

    # mean aggregation
    num_sentences = len(sentences)
    final_scores = {
        label: round(total / num_sentences, 3)
        for label, total in agg_scores.items()
    }

    suggestions = build_suggestions(final_scores)

    return {
        "original_text": text,
        "scores": final_scores,
        "highlights": highlights,
        "suggestions": suggestions
    }
