import os
import json
from datetime import datetime
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score, f1_score

from evaluate_model import evaluate, write_training_report

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # 1. Load the dataset
    processed_csv = os.path.join(os.path.dirname(base_dir), 'Dataset Analysis', 'data', 'processed', 'instagram_profiles_clean.csv')
    raw_csv = os.path.join(os.path.dirname(base_dir), 'Dataset Analysis', 'data', 'raw', 'instagram_profiles.csv')
    
    if os.path.exists(processed_csv):
        csv_path = processed_csv
        print(f"Loading processed dataset: {csv_path}")
    elif os.path.exists(raw_csv):
        csv_path = raw_csv
        print(f"Loading raw dataset: {csv_path}")
    else:
        print("Error: Dataset not found in Dataset Analysis folder.")
        return

    df = pd.read_csv(csv_path)
    print(f"Dataset shape: {df.shape}")

    # 2. Separate features and target
    X = df.drop("fake", axis=1)
    y = df["fake"]
    
    feature_names = X.columns.tolist()
    print(f"\nFeatures ({len(feature_names)}): {feature_names}")

    # 3. Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f"\nTrain set shape: {X_train.shape}")
    print(f"Test set shape: {X_test.shape}")

    # 4. Train the Random Forest Classifier
    print("\nTraining Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # 5-8. Evaluate the model using the evaluate helper
    metrics, top_features = evaluate(model, X_train, X_test, y_train, y_test, feature_names, base_dir)

    # 9. Optional baseline comparison
    print("\n--- Baseline Comparison ---")
    lr_model = LogisticRegression(max_iter=1000, random_state=42)
    lr_model.fit(X_train, y_train)
    lr_pred = lr_model.predict(X_test)
    print(f"Logistic Regression - Acc: {accuracy_score(y_test, lr_pred):.4f}, F1: {f1_score(y_test, lr_pred):.4f}")

    gb_model = GradientBoostingClassifier(random_state=42)
    gb_model.fit(X_train, y_train)
    gb_pred = gb_model.predict(X_test)
    print(f"Gradient Boosting   - Acc: {accuracy_score(y_test, gb_pred):.4f}, F1: {f1_score(y_test, gb_pred):.4f}")
    print("Random Forest is selected as the primary model and will be saved.")

    # 10. Save the model
    models_dir = os.path.join(base_dir, 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = os.path.join(models_dir, 'fake_instagram_model.pkl')
    joblib.dump(model, model_path)
    print(f"\nSaved model to {model_path}")

    # 11. Save metadata
    metadata = {
        "features": feature_names,
        "model_type": "RandomForestClassifier",
        "hyperparameters": {
            "n_estimators": 100,
            "random_state": 42
        },
        "training_date": datetime.now().isoformat(),
        "dataset_size": len(df),
        "metrics": metrics
    }
    metadata_path = os.path.join(models_dir, 'model_metadata.json')
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=4)
    print(f"Saved metadata to {metadata_path}")

    # 12. Written summary
    write_training_report(metrics, top_features, len(df), len(X_train), len(X_test), base_dir)

if __name__ == "__main__":
    main()
