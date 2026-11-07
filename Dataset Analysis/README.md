# Dataset Analysis (Stage 1)

This folder contains the exploratory data analysis (EDA) for the Fake Instagram Profile Detector project.

## How to run the analysis

1. **Environment Setup**: Ensure you have Python installed, create a virtual environment, and install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Script**: Execute the analysis script:
   ```bash
   python scripts/dataset_analysis.py
   ```

3. **Run the Notebook**: Alternatively, launch Jupyter and open the notebook:
   ```bash
   jupyter notebook notebooks/01_dataset_analysis.ipynb
   ```

## Dataset Handling

The script and notebook are configured to automatically download the "nahiar/instagram_bot_detection" dataset from Hugging Face and save it to `data/raw/instagram_profiles.csv`.

If automatic downloading fails (e.g., due to lack of internet access or API changes), you must manually place the dataset CSV file at `data/raw/instagram_profiles.csv` before running the script or notebook.
