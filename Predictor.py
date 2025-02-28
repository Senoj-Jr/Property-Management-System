from transformers import MobileBertTokenizer, MobileBertForSequenceClassification
import torch
import numpy as np

# Load the trained model and tokenizer
model_path = "C:\\Users\\lokes\\OneDrive\\Desktop\\Final year project\\Python\\mobilebert_severity_model"
tokenizer = MobileBertTokenizer.from_pretrained(model_path)
model = MobileBertForSequenceClassification.from_pretrained(model_path)

# Function for making predictions
def predict_severity(text):
    inputs = tokenizer(text, truncation=True, padding=True, return_tensors="pt")
    with torch.no_grad():  # Disable gradients for efficient inference
        outputs = model(**inputs)
        prediction = torch.argmax(outputs.logits, dim=1).item()
    return prediction

# Test with new input
sample_text = "Water leakage in bathroom"
predicted_severity = predict_severity(sample_text)
print(f"Predicted Severity (Encoded Label): {predicted_severity}")
