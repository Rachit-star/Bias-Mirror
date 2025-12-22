#this file only takes text , runs the model and returns raw scores for all  labels

import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from app.config import MODEL_PATH, MAX_LEN
from app.utils.label_map import ID2LABEL

device = torch.device("cuda" if torch.cuda.is_available() else "cpu") #checks if GPU is available else uses CPU

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH) #load tokenizer from the specified model path used during training
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH).to(device) #loads model and trained weights onto the device
model.eval() #turns off dropout and other training-specific layers

def run_model(text: str) -> dict: #function to run the model on input text and return raw scores for all labels
    inputs = tokenizer( #tokenizes the input text, truncates/pads to MAX_LEN, and converts to tensors
        text,
        truncation=True,
        padding="max_length",
        max_length=MAX_LEN,
        return_tensors="pt"
    ).to(device)

    with torch.no_grad(): #shuts off gradient calculations for inference since no training is happening
        logits = model(**inputs).logits #raw output scores from the model
        probs = torch.softmax(logits, dim=1)[0].cpu().tolist()#convert logits to probabilities using softmax , turns off GPU and converts to list

    # return ALL  labels
    return {ID2LABEL[i]: float(probs[i]) for i in range(len(probs))}
