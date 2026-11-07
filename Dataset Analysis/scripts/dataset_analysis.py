import os
from datasets import load_dataset
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def main():
    # Setup directories
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    raw_dir = os.path.join(base_dir, 'data', 'raw')
    processed_dir = os.path.join(base_dir, 'data', 'processed')
    plots_dir = os.path.join(base_dir, 'outputs', 'plots')
    
    os.makedirs(raw_dir, exist_ok=True)
    os.makedirs(processed_dir, exist_ok=True)
    os.makedirs(plots_dir, exist_ok=True)

    csv_path = os.path.join(raw_dir, 'instagram_profiles.csv')

    # Step 1: Download dataset if not exists
    if not os.path.exists(csv_path):
        print("Downloading dataset...")
        try:
            ds = load_dataset("nahiar/instagram_bot_detection")
            df = ds['train'].to_pandas()
            df.to_csv(csv_path, index=False)
            print("SUCCESS: Downloaded via datasets library")
        except Exception as e:
            print(f"FAILED: {e}")
            return
    else:
        print("Dataset already exists.")

    # Step 1: Load the CSV
    print("\n--- 1. Load the CSV ---")
    df = pd.read_csv(csv_path)

    # Step 2: Display the first 5 rows
    print("\n--- 2. First 5 rows ---")
    print(df.head())

    # Step 3: Check shape
    print("\n--- 3. Dataset Shape ---")
    print(df.shape)

    # Step 4: Check column names
    print("\n--- 4. Column Names ---")
    columns = df.columns.tolist()
    print(columns)
    
    # Step 5: Check data types
    print("\n--- 5. Data Types ---")
    print(df.dtypes)

    # Step 6: Check missing values
    print("\n--- 6. Missing Values ---")
    print(df.isnull().sum())
    print(f"Total missing values: {df.isnull().sum().sum()}")

    # Step 7: Check duplicate rows
    print("\n--- 7. Duplicate Rows ---")
    duplicates = df.duplicated().sum()
    print(f"Total duplicate rows: {duplicates}")
    if duplicates > 0:
        print("Sample of duplicates:")
        print(df[df.duplicated(keep=False)].sort_values(by=columns).head())
        df_clean = df.drop_duplicates()
        clean_path = os.path.join(processed_dir, 'instagram_profiles_clean.csv')
        df_clean.to_csv(clean_path, index=False)
        print(f"Saved deduplicated data to {clean_path}")
        df = df_clean # Use clean data for subsequent plots/analysis

    # Step 8: Check class distribution
    print("\n--- 8. Class Distribution ---")
    print(df['fake'].value_counts())
    print(df['fake'].value_counts(normalize=True) * 100)
    
    plt.figure(figsize=(6, 4))
    sns.countplot(data=df, x='fake')
    plt.title('Class Distribution (Fake vs Real)')
    plt.savefig(os.path.join(plots_dir, 'class_distribution.png'))
    plt.close()

    # Step 9: Summary statistics
    print("\n--- 9. Summary Statistics ---")
    print(df.describe())

    # Step 10: Feature distributions
    print("\n--- 10. Feature Distributions ---")
    numeric_features = ['#posts', '#followers', '#follows', 'description length', 'nums/length username', 'nums/length fullname', 'fullname words']
    binary_features = ['profile pic', 'private', 'external URL', 'name==username']

    for feat in numeric_features:
        if feat in df.columns:
            plt.figure(figsize=(8, 4))
            sns.histplot(df[feat], bins=50, kde=True)
            plt.title(f'Distribution of {feat}')
            safe_name = feat.replace('/', '_').replace('#', 'num_').replace('==', '_eq_').replace(' ', '_')
            plt.savefig(os.path.join(plots_dir, f'dist_{safe_name}.png'))
            plt.close()
            
    for feat in binary_features:
        if feat in df.columns:
            plt.figure(figsize=(6, 4))
            sns.countplot(data=df, x=feat)
            plt.title(f'Count of {feat}')
            safe_name = feat.replace('==', '_eq_').replace(' ', '_')
            plt.savefig(os.path.join(plots_dir, f'count_{safe_name}.png'))
            plt.close()

    # Step 11: Fake vs. Real comparison
    print("\n--- 11. Fake vs Real Comparison ---")
    for feat in numeric_features:
        if feat in df.columns:
            plt.figure(figsize=(8, 4))
            sns.boxplot(data=df, x='fake', y=feat)
            plt.title(f'{feat} by Class (Fake vs Real)')
            safe_name = feat.replace('/', '_').replace('#', 'num_').replace('==', '_eq_').replace(' ', '_')
            plt.savefig(os.path.join(plots_dir, f'boxplot_{safe_name}.png'))
            plt.close()

    # Step 12: Correlation analysis
    print("\n--- 12. Correlation Analysis ---")
    plt.figure(figsize=(10, 8))
    corr = df.corr()
    sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm")
    plt.title('Feature Correlation Heatmap')
    plt.tight_layout()
    plt.savefig(os.path.join(plots_dir, 'correlation_heatmap.png'))
    plt.close()

    correlations = corr['fake'].sort_values(ascending=False)
    print("Correlations with target 'fake':")
    print(correlations)

    # Step 13: Outlier check
    print("\n--- 13. Outliers (IQR Method) ---")
    for feat in ['#followers', '#follows', '#posts']:
        if feat in df.columns:
            Q1 = df[feat].quantile(0.25)
            Q3 = df[feat].quantile(0.75)
            IQR = Q3 - Q1
            outliers = df[(df[feat] < (Q1 - 1.5 * IQR)) | (df[feat] > (Q3 + 1.5 * IQR))]
            print(f"{feat}: {len(outliers)} outliers")

if __name__ == "__main__":
    main()
