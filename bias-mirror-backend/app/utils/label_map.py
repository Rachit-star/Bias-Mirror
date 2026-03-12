ID2LABEL = {
    0: "gender",
    1: "neutral",
    2: "political",
    3: "racial",
    4: "toxic",
}

LABEL2ID = {v: k for k, v in ID2LABEL.items()}

BIAS_LABELS = {"gender", "political", "racial", "toxic"}

LABEL_DISPLAY = {
    "gender":    "Gender Bias",
    "neutral":   "Neutral",
    "political": "Political Bias",
    "racial":    "Racial Bias",
    "toxic":     "Toxic Language",
}

LABEL_COLORS = {
    "gender":    "#f472b6",  # pink
    "political": "#60a5fa",  # blue
    "racial":    "#fb923c",  # orange
    "toxic":     "#f87171",  # red
    "neutral":   "#86efac",  # green
}