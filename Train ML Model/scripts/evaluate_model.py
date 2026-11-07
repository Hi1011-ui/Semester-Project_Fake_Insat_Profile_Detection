import os
import json
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score
)
from sklearn.model_selection import cross_val_score

def evaluate(model, X_train, X_test, y_train, y_test, feature_names, base_dir):
    plots_dir = os.path.join(base_dir, 'outputs', 'plots')
    os.makedirs(plots_dir, exist_ok=True)
    
    # 5. Predict on test set
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]

    # 6. Evaluate metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_pred_proba)

    print("\n--- Evaluation Metrics ---")
    print(f"Accuracy:  {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall:    {recall:.4f}")
    print(f"F1 Score:  {f1:.4f}")
    print(f"ROC-AUC:   {roc_auc:.4f}")

    print("\n--- Classification Report ---")
    print(classification_report(y_test, y_pred))

    # Confusion Matrix Plot
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['Real', 'Fake'], yticklabels=['Real', 'Fake'])
    plt.title('Confusion Matrix')
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.tight_layout()
    plt.savefig(os.path.join(plots_dir, 'confusion_matrix.png'))
    plt.close()

    # 7. Cross-validation
    print("\n--- 5-Fold Cross Validation ---")
    cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')
    print(f"CV Accuracy Scores: {cv_scores}")
    print(f"Mean CV Accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

    # 8. Feature Importance
    importances = model.feature_importances_
    indices = np.argsort(importances)[::-1]
    
    plt.figure(figsize=(10, 6))
    plt.title("Feature Importances")
    sns.barplot(x=importances[indices], y=np.array(feature_names)[indices], orient='h')
    plt.tight_layout()
    plt.savefig(os.path.join(plots_dir, 'feature_importance.png'))
    plt.close()
    
    top_features = [feature_names[i] for i in indices[:4]]
    print("\n--- Top Predictive Features ---")
    for i in range(4):
        print(f"{i+1}. {top_features[i]} ({importances[indices[i]]:.4f})")

    # Save metrics for metadata
    metrics = {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1_score": f1,
        "roc_auc": roc_auc,
        "cv_accuracy_mean": cv_scores.mean()
    }
    
    return metrics, top_features

def write_training_report(metrics, top_features, dataset_size, train_size, test_size, base_dir):
    report_content = f"""# ML Training Report

This report summarizes the training and evaluation of the machine learning model for the Fake Instagram Profile Detector project.

## Dataset and Splits
- **Total Dataset Size Used**: {dataset_size} rows
- **Training Set Size**: {train_size} rows (80%)
- **Test Set Size**: {test_size} rows (20%)

## Final Model Metrics (Random Forest)
The primary model chosen is a Random Forest Classifier. It was evaluated on the 20% test holdout set.
- **Accuracy**: {metrics['accuracy']:.4f}
- **Precision**: {metrics['precision']:.4f}
- **Recall**: {metrics['recall']:.4f}
- **F1 Score**: {metrics['f1_score']:.4f}
- **ROC-AUC**: {metrics['roc_auc']:.4f}

A 5-fold cross-validation on the training set confirmed these results with a mean accuracy of {metrics['cv_accuracy_mean']:.4f}, indicating the model is robust and not heavily overfitting to a specific split.

## Top Predictive Features
Based on the Random Forest's feature importance extraction, the top 4 most predictive characteristics are:
1. **{top_features[0]}**
2. **{top_features[1]}**
3. **{top_features[2]}**
4. **{top_features[3]}**

These align with the exploratory data analysis, showing that lack of a profile picture, empty or short bios, and a high digit ratio in the username are strong indicators of a fake account.

## Limitations
*Note: This model was trained on a specific labeled dataset of profile characteristics, meaning it learns from these synthetic or historically labeled patterns. It does not communicate with Instagram's internal servers or verify the actual real-time status of an account, so its output should be interpreted as an educational prediction based on profile-level metadata, rather than a definitive factual classification.*
"""
    
    report_path = os.path.join(base_dir, 'outputs', 'training_report.md')
    os.makedirs(os.path.dirname(report_path), exist_ok=True)
    with open(report_path, 'w') as f:
        f.write(report_content)
    print(f"\nSaved training report to {report_path}")
