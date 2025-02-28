import torch
import pickle
from fastapi import FastAPI
from transformers import MobileBertTokenizer, MobileBertForSequenceClassification
from pydantic import BaseModel

# Load Model & Tokenizer
model_path = "mobilebert_severity_model"
model = MobileBertForSequenceClassification.from_pretrained(model_path)
tokenizer = MobileBertTokenizer.from_pretrained(model_path)

# Load Label Encoder
with open("label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

app = FastAPI()

# Request model
class TextRequest(BaseModel):
    statement: str

# Prediction Function
def predict_severity(text):
    inputs = tokenizer(text, truncation=True, padding=True, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
        prediction = torch.argmax(outputs.logits, dim=1).item()
    return label_encoder.inverse_transform([prediction])[0]  # Convert to original label

# API Endpoint
@app.post("/predict")
async def get_severity(data: TextRequest):
    severity = predict_severity(data.statement)
    return {"severity": severity}
