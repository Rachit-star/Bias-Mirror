# 🪞 Bias Mirror

Bias Mirror is a web app that detects linguistic bias in free-form text. Paste in a sentence or paragraph and it flags whether the text reads as gender-biased, racially biased, appearance-biased, toxic, or neutral — and can rewrite flagged text into a more neutral version.

The classifier is fine-tuned on real, human-annotated data (Social Bias Frames, CrowS-Pairs, Civil Comments, HateXplain) rather than synthetic examples, across five transformer architectures compared head-to-head. Full writeup of the dataset construction and model comparison is in [`/paper`](./paper).

---

## Motivation

Most lightweight bias-detection demos are trained on small, synthetically generated datasets — clean, textbook-style examples of what bias "should" look like. That doesn't match how bias actually shows up in real writing: messier, more contextual, often only obvious given the surrounding sentence.

Bias Mirror started as exactly that kind of synthetic-data project. This version rebuilds it from scratch on real, human-annotated text, compares five transformer architectures (XLM-RoBERTa, mBERT, DistilBERT, ELECTRA, mDeBERTa) under an identical training protocol, and — maybe more importantly — stress-tests all of them with adversarial examples the formal test set doesn't cover. That stress test surfaced a real, documented failure mode (models treating the *mention* of a protected-attribute word as evidence of bias, regardless of context) that persists across every architecture tested. That finding, and the honest limitations that come with it, are as much the point of this project as the detector itself.

---

## Quick Start

### Clone the repo

```bash
git clone https://github.com/Noire2903/bias-mirror.git
cd bias-mirror
```

### Install the frontend

```bash
cd frontend
npm install
```

### Install the backend

```bash
cd ../backend
pip install -r requirements.txt --break-system-packages
```

### Set environment variables

Create a `.env` file in `/backend` with:

```
HF_MODEL_REPO=Noire2903/bias-mirror-model-electra
HF_TOKEN=your_huggingface_token
```

### Run it locally

```bash
# backend (from /backend)
uvicorn main:app --reload --port 8000

# frontend (from /frontend, in a separate terminal)
npm run dev
```

The app should now be running at `http://localhost:5173`, talking to the API at `http://localhost:8000`.

---

## Usage

**Web app**: paste text into the input box and hit **Analyze**. Bias Mirror returns the predicted category (`gender`, `racial`, `physical_appearance`, `toxic`, `neutral`) with a confidence score, and offers a rewritten, neutralized version if bias is detected.

**API**: the backend also works standalone.

```bash
curl -X POST https://your-deployed-backend.hf.space/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Women are too emotional to be good leaders."}'
```

```json
{
  "label": "gender",
  "confidence": 0.991,
  "rewrite": "Leaders should be evaluated on their decisions, not stereotypes about who is fit to lead."
}
```

Model weights are hosted on HuggingFace: [`Noire2903/bias-mirror-model-electra`](https://huggingface.co/Noire2903/bias-mirror-model-electra) (primary) and [`Noire2903/bias-mirror-model-v2`](https://huggingface.co/Noire2903/bias-mirror-model-v2) / [`Noire2903/bias-mirror-model-mbert`](https://huggingface.co/Noire2903/bias-mirror-model-mbert) (comparison models — see the paper for the full five-model benchmark).

---

## Model & Dataset

| Model | Accuracy | F1 Macro | Notes |
|---|---|---|---|
| **ELECTRA-base** | **87.7%** | **0.834** | Primary/deployed model |
| mBERT | 87.4% | 0.834 | Comparison |
| XLM-RoBERTa-base | 86.5% | 0.808 | Comparison, original v1 backbone |
| DistilBERT-multilingual | 85.0% | 0.793 | Comparison, efficiency tradeoff |
| mDeBERTa-v3-base | — | — | Failed to converge (documented in paper) |

Trained on 15,894 real, human-annotated examples merged from four public sources — see [`/paper/BiasMirror_CAS.pdf`](./paper/BiasMirror_CAS.pdf) for the full dataset construction methodology, per-class results, and the adversarial stress test findings.

---

## Contributing

### Run the test suite

```bash
cd backend
pytest
```

```bash
cd frontend
npm test
```

### Retrain or compare a model

The dataset build and training notebooks are in [`/notebooks`](./notebooks) — built to run on a Kaggle GPU instance. See the paper's Methodology section for the exact training configuration if you want to reproduce or extend the comparison.

### Submit a pull request

Fork the repository, create a branch for your change, and open a pull request against `main`. For anything nontrivial (a new data source, a new model comparison, a UI change), please open an issue first so we can talk through the approach before you put the work in.

---

## License

MIT
