# ML Training Report

This report summarizes the training and evaluation of the machine learning model for the Fake Instagram Profile Detector project.

## Dataset and Splits
- **Total Dataset Size Used**: 4934 rows
- **Training Set Size**: 3947 rows (80%)
- **Test Set Size**: 987 rows (20%)

## Final Model Metrics (Random Forest)
The primary model chosen is a Random Forest Classifier. It was evaluated on the 20% test holdout set.
- **Accuracy**: 0.9838
- **Precision**: 0.9917
- **Recall**: 0.9756
- **F1 Score**: 0.9836
- **ROC-AUC**: 0.9993

A 5-fold cross-validation on the training set confirmed these results with a mean accuracy of 0.9858, indicating the model is robust and not heavily overfitting to a specific split.

## Top Predictive Features
Based on the Random Forest's feature importance extraction, the top 4 most predictive characteristics are:
1. **profile pic**
2. **#followers**
3. **#posts**
4. **nums/length username**

These align with the exploratory data analysis, showing that lack of a profile picture, empty or short bios, and a high digit ratio in the username are strong indicators of a fake account.

## Limitations
*Note: This model was trained on a specific labeled dataset of profile characteristics, meaning it learns from these synthetic or historically labeled patterns. It does not communicate with Instagram's internal servers or verify the actual real-time status of an account, so its output should be interpreted as an educational prediction based on profile-level metadata, rather than a definitive factual classification.*
