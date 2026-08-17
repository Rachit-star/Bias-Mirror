Bias Mirror is a web app that detects linguistic bias in free-form text. Paste in a sentence or paragraph and it flags whether the text reads as gender-biased, racially biased, appearance-biased, toxic, or neutral — and can rewrite flagged text into a more neutral version.

The classifier is fine-tuned on real, human-annotated data (Social Bias Frames, CrowS-Pairs, Civil Comments, HateXplain) rather than synthetic examples, across five transformer architectures compared head-to-head. Full writeup of the dataset construction and model comparison is in /paper.

Motivation

Most lightweight bias-detection demos are trained on small, synthetically generated datasets — clean, textbook-style examples of what bias "should" look like. That doesn't match how bias actually shows up in real writing: messier, more contextual, often only obvious given the surrounding sentence.

Bias Mirror started as exactly that kind of synthetic-data project. This version rebuilds it from scratch on real, human-annotated text, compares five transformer architectures (XLM-RoBERTa, mBERT, DistilBERT, ELECTRA, mDeBERTa) under an identical training protocol, and — maybe more importantly — stress-tests all of them with adversarial examples the formal test set doesn't cover. That stress test surfaced a real, documented failure mode (models treating the mention of a protected-attribute word as evidence of bias, regardless of context) that persists across every architecture tested. That finding, and the honest limitations that come with it, are as much the point of this project as the detector itself.
