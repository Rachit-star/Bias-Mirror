from app.utils.text_splitter import split_into_sentences
from app.services.model_service import run_model
from app.services.suggestion_service import build_suggestions
from app.services.highlight_service import REASON_MAP, THRESHOLD
from app.utils.label_map import BIAS_LABELS


def analyze_text(text: str) -> dict:
    sentences = split_into_sentences(text)

    if not sentences:
        return {
            "original_text":       text,
            "scores":              {},
            "highlights":          [],
            "suggestions":         [],
            "dominant_label":      "neutral",
            "dominant_confidence": 0.0,
        }

    highlights = []
    agg_scores = {}

    for sentence, start, end in sentences:
        result = run_model(sentence)
        scores = result["scores"]

        for label, value in scores.items():
            agg_scores.setdefault(label, 0.0)
            agg_scores[label] += value

        top_label = result["top_label"]
        top_conf  = result["top_confidence"]
        sec_label = result["secondary_label"]
        sec_conf  = result["secondary_confidence"]

        if top_label != "neutral" and top_conf >= THRESHOLD:
            highlights.append({
                "start":                start,
                "end":                  end,
                "label":                top_label,
                "confidence":           top_conf,
                "reason":               REASON_MAP.get(top_label, "Potential bias detected."),
                "secondary_label":      sec_label,
                "secondary_confidence": sec_conf,
            })

    num_sentences = len(sentences)
    final_scores  = {
        label: round(total / num_sentences, 4)
        for label, total in agg_scores.items()
    }

    # Use dominant bias label for suggestions, not overall dominant
    bias_scores   = {k: v for k, v in final_scores.items() if k in BIAS_LABELS}
    dominant_bias = max(bias_scores, key=bias_scores.get) if bias_scores else "neutral"
    suggestions   = build_suggestions({dominant_bias: 1.0})

    # Only show bias as dominant if there are actual highlights
    dominant_label = dominant_bias if highlights else "neutral"
    dominant_conf  = round(final_scores.get(dominant_label, 0.0), 4)

    return {
        "original_text":       text,
        "scores":              final_scores,
        "highlights":          highlights,
        "suggestions":         suggestions,
        "dominant_label":      dominant_label,
        "dominant_confidence": dominant_conf,
    }