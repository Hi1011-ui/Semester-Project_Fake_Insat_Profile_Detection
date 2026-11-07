# Train ML Model (Stage 2)

This folder contains the machine learning training pipeline for the Fake Instagram Profile Detector project.

## Overview
We train a **Random Forest Classifier** using the dataset generated in Stage 1 (`Dataset Analysis/data/processed/instagram_profiles_clean.csv`). The training script splits the data, fits the model, performs evaluation, and saves the final serialized model along with its metadata.

## How to run the training pipeline

1. **Environment Setup**: Ensure you have Python installed and install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Script**: Execute the training script to retrain the model and generate metrics:
   ```bash
   python scripts/train_model.py
   ```

3. **Run the Notebook**: Alternatively, launch Jupyter and step through the notebook interactively:
   ```bash
   jupyter notebook notebooks/02_train_model.ipynb
   ```

## Outputs

- `models/fake_instagram_model.pkl`: The serialized, trained Random Forest model.
- `models/model_metadata.json`: Contains the exact feature order, hyperparameters, and evaluation metrics used for this model. This file is intended to be read by the backend to ensure consistency.
- `outputs/plots/`: Contains evaluation visualizations like the confusion matrix and feature importances.
- `outputs/training_report.md`: A summary of the model's performance and top predictive features.
