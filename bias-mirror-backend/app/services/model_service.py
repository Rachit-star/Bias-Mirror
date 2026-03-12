import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from app.config import MODEL_PATH, MAX_LEN
from app.utils.label_map import ID2LABEL

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"[model_service] Loading model from: {MODEL_PATH} on {device}")

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model     = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH).to(device)
model.eval()

print("[model_service] Model loaded successfully!")

def run_model(text: str) -> dict:
    inputs = tokenizer(
        text,
        truncation=True,
        padding="max_length",
        max_length=MAX_LEN,
        return_tensors="pt"
    ).to(device)

    with torch.no_grad():
        logits = model(**inputs).logits
        probs  = F.softmax(logits, dim=1)[0].cpu().tolist()

    scores = {ID2LABEL[i]: round(float(probs[i]), 4) for i in range(len(probs))}

    sorted_labels = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    top_label, top_conf       = sorted_labels[0]
    second_label, second_conf = sorted_labels[1]

    return {
        "scores":               scores,
        "top_label":            top_label,
        "top_confidence":       round(top_conf, 4),
        "secondary_label":      second_label if second_conf >= 0.15 else None,
        "secondary_confidence": round(second_conf, 4) if second_conf >= 0.15 else None,
    }