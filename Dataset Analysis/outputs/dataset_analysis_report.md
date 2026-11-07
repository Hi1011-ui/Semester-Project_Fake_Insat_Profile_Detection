# Dataset Analysis Report

This report summarizes the exploratory data analysis (EDA) conducted on the Hugging Face Instagram Fake Profile Detection dataset (`nahiar/instagram_bot_detection`).

## Dataset Overview
- **Initial Shape**: 5,000 rows × 12 columns.
- **Missing Values**: 0 missing values across all columns.
- **Duplicates**: 66 duplicate rows were detected. These duplicates were removed, resulting in a final cleaned dataset of 4,934 rows × 12 columns. The cleaned data was saved to `data/processed/instagram_profiles_clean.csv`.
- **Class Balance**: The dataset is highly balanced. After deduplication, there are 2,476 real profiles (50.18%) and 2,458 fake profiles (49.82%).

## Key Observations
Based on the correlation analysis and feature distributions, the following characteristics emerged as the most predictive indicators of a fake profile:

- **Lack of Profile Picture**: The `profile pic` feature has the strongest correlation with the `fake` label (-0.78). Fake profiles are significantly less likely to have a profile picture compared to real ones.
- **High Ratio of Numbers in Username**: The `nums/length username` feature strongly correlates with fake profiles (0.67). Fake accounts tend to have a higher proportion of digits in their usernames.
- **Shorter Biographies**: The `description length` feature is negatively correlated with fake accounts (-0.51). Fake profiles typically have much shorter or entirely empty bios.
- **Fewer Full Name Words**: Fake profiles often have fewer words in their full names (`fullname words` correlation of -0.30), sometimes leaving the full name field blank entirely.
- **Lower Account Activity**: Features such as `#posts` (-0.26) and `#follows` (-0.24) show that fake profiles tend to have less overall activity and follow fewer accounts compared to genuine profiles.

These findings suggest that a combination of these profile-level characteristics—especially the presence of a profile picture, username composition, and bio length—will be highly effective features for training the Random Forest classification model in the next stage.
