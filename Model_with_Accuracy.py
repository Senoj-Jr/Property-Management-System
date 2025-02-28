import os
import pandas as pd
import torch
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from transformers import MobileBertTokenizer, MobileBertForSequenceClassification, Trainer, TrainingArguments
from torch.utils.data import Dataset
import evaluate

# Disable wandb if not needed
os.environ["WANDB_DISABLED"] = "true"

# Load dataset
df = pd.read_csv("C:/Users/lokes/OneDrive/Desktop/Final year project/Dataset/3111 NYC - dataset with severity.csv")

# Filter dataset to retain only relevant complaint types
complaint_types_to_keep = ["Door/Window", "Electric", "Flooring/Stairs", "General", "Paint/Plaster", "Plumbing", "Water Leak"]
df_filtered = df[df["Complaint Type"].isin(complaint_types_to_keep)].dropna(subset=["Severity"])

# Concatenate text features
df_filtered["text"] = (
    df_filtered["Complaint Type"].astype(str) + " - " +
    df_filtered["Descriptor"].astype(str) + " " +
    df_filtered["Additional_Details"].astype(str) + " in " +
    df_filtered["Location_Details"].astype(str)
)

# Keep only necessary columns
df_filtered = df_filtered[["text", "Severity"]]

# Encode severity labels
label_encoder = LabelEncoder()
df_filtered["Severity"] = label_encoder.fit_transform(df_filtered["Severity"])

# Save LabelEncoder for future use
with open("label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

# Split Data into Train & Test Sets
train_texts, test_texts, train_labels, test_labels = train_test_split(
    df_filtered["text"].tolist(), df_filtered["Severity"].tolist(),
    test_size=0.2, random_state=42
)

# Load MobileBERT tokenizer
tokenizer = MobileBertTokenizer.from_pretrained("google/mobilebert-uncased")

# Define Dataset Class
class SeverityDataset(Dataset):
    def __init__(self, texts, labels, tokenizer):
        self.encodings = tokenizer(texts, truncation=True, padding=True, max_length=128)
        self.labels = torch.tensor(labels, dtype=torch.long)

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item["labels"] = self.labels[idx]
        return item


# Create train & test datasets
train_dataset = SeverityDataset(train_texts, train_labels, tokenizer)
test_dataset = SeverityDataset(test_texts, test_labels, tokenizer)

# Check dataset size before training
print(f"Train Dataset Size: {len(train_dataset)}")
print(f"Test Dataset Size: {len(test_dataset)}")

if len(train_dataset) == 0 or len(test_dataset) == 0:
    raise ValueError("Training or Test dataset is empty! Check data preprocessing.")

# Load MobileBERT model
model = MobileBertForSequenceClassification.from_pretrained("google/mobilebert-uncased", num_labels=len(set(train_labels)))

# Define Training Arguments
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
    fp16=True,  # Mixed precision for faster training
    report_to="none"  # Prevents unwanted wandb logging
)

# Define Accuracy Metric
metric = evaluate.load("accuracy")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    compute_metrics=compute_metrics  # Pass metric function
)

# Train Model
trainer.train()

# Evaluate Model
eval_results = trainer.evaluate()
print("Evaluation Results:", eval_results)

# Extract accuracy explicitly
accuracy = eval_results.get("eval_accuracy", 0)
print(f"Model Accuracy: {accuracy:.4f}")

# Save Model and Tokenizer
model.save_pretrained("mobilebert_severity_model")
tokenizer.save_pretrained("mobilebert_severity_model")

# Reload everything for future predictions
# Load Model and Tokenizer
model = MobileBertForSequenceClassification.from_pretrained("mobilebert_severity_model")
tokenizer = MobileBertTokenizer.from_pretrained("mobilebert_severity_model")

# Load LabelEncoder
with open("label_encoder.pkl", "rb") as f:
    loaded_label_encoder = pickle.load(f)

# Prediction Function
def predict_severity(text):
    inputs = tokenizer(text, truncation=True, padding=True, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
        prediction = torch.argmax(outputs.logits, dim=1).item()
    return loaded_label_encoder.inverse_transform([prediction])[0]  # Convert back to label

# Test Prediction
sample_text = "No lighting in kitchen"
predicted_severity = predict_severity(sample_text)
print(f"Predicted Severity: {predicted_severity}")
