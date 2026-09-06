# Bias Mirror

Bias Mirror is a web app that detects linguistic bias in free-form text. Paste in a sentence or paragraph and it flags whether the text reads as gender-biased, racially biased, appearance-biased, toxic, or neutral — and rewrites flagged text into a more neutral version.

The classifier is fine-tuned on real, human-annotated data (Social Bias Frames, CrowS-Pairs, Civil Comments, HateXplain) rather than synthetic examples, across five transformer architectures compared head-to-head.

**Live app**: [bias-mirror.vercel.app](https://bias-mirror.vercel.app)

---

## Motivation

Most lightweight bias-detection demos are trained on small, synthetically generated datasets — clean, textbook-style examples of what bias "should" look like. That doesn't match how bias actually shows up in real writing: messier, more contextual, often only obvious given the surrounding sentence.

Bias Mirror started as exactly that kind of synthetic-data project. This version rebuilds it from scratch on real, human-annotated text, compares five transformer architectures (XLM-RoBERTa, mBERT, DistilBERT, ELECTRA, mDeBERTa) under an identical training protocol, and — maybe more importantly — stress-tests all of them with adversarial examples the formal test set doesn't cover. That stress test surfaced a real, documented failure mode (models treating the *mention* of a protected-attribute word as evidence of bias, regardless of context) that persists across every architecture tested. That finding, and the honest limitations that come with it, are as much the point of this project as the detector itself.

---

## Quick Start

### Clone the repo

```bash
git clone https://github.com/Rachit-star/Bias-Mirror.git
cd Bias-Mirror
```

### Backend

```bash
cd bias-mirror-backend
pip install -r requirements.txt --break-system-packages
```

Run it (adjust the entry point/port below if your backend's main file is named differently):

```bash
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd ../bias-mirror-frontend
npm install
npm run dev
```

By default this should serve the frontend locally and point it at your local backend — check `bias-mirror-frontend`'s environment/config file for the API base URL if it's instead pointed at the production backend.

---

## Usage

**Web app**: paste text into the input box and hit **Analyze**. Bias Mirror returns the predicted category (`gender`, `racial`, `physical_appearance`, `toxic`, `neutral`) with a confidence score, and offers a rewritten, neutralized version if bias is detected.

**API**: the backend also works standalone — see `bias-mirror-backend` for the exact route names and request/response schema.

Model weights are hosted on HuggingFace:
- [`Noire2903/bias-mirror-model-electra`](https://huggingface.co/Noire2903/bias-mirror-model-electra) — primary model
- [`Noire2903/bias-mirror-model-v2`](https://huggingface.co/Noire2903/bias-mirror-model-v2) (XLM-RoBERTa) and [`Noire2903/bias-mirror-model-mbert`](https://huggingface.co/Noire2903/bias-mirror-model-mbert) — comparison models

---

## Model & Dataset

| Model | Accuracy | F1 Macro | Notes |
|---|---|---|---|
| **ELECTRA-base** | **87.7%** | **0.834** | Primary/deployed model |
| mBERT | 87.4% | 0.834 | Comparison |
| XLM-RoBERTa-base | 86.5% | 0.808 | Comparison, original v1 backbone |
| DistilBERT-multilingual | 85.0% | 0.793 | Comparison, efficiency tradeoff |
| mDeBERTa-v3-base | — | — | Failed to converge during training (documented in the paper) |

Trained on 15,894 real, human-annotated examples merged from four public sources: Social Bias Frames, CrowS-Pairs, Civil Comments (Jigsaw), and HateXplain. Full dataset construction methodology, per-class results, and the adversarial stress test findings are written up in the accompanying paper.

---

## Contributing

### Run the test suite

```bash
cd bias-mirror-backend
pytest
```

```bash
cd bias-mirror-frontend
npm test
```

(Adjust the above if either side doesn't yet have a test suite set up.)

### Retrain or compare a model

The dataset build and training notebooks used for the model comparison are built to run on a Kaggle GPU instance. See the paper's Methodology section for the exact training configuration (splits, hyperparameters, class weighting) if you want to reproduce or extend the comparison.

### Submit a pull request

Fork the repository, create a branch for your change, and open a pull request against `main`. For anything nontrivial (a new data source, a new model comparison, a UI change), please open an issue first so we can talk through the approach before you put the work in.

---

## License

MIT
