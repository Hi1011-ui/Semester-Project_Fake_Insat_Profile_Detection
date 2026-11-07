import sqlite3
import os
import pathlib
from database import DB_PATH

def inspect():
    print(f"Inspecting database: {DB_PATH}")
    if not os.path.exists(DB_PATH):
        print("Database file does not exist.")
        return
        
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        print("\n--- Schema ---")
        cursor.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='predictions'")
        row = cursor.fetchone()
        if row:
            print(row['sql'])
        else:
            print("Table 'predictions' not found.")
            
        print("\n--- Latest Rows ---")
        cursor.execute("SELECT * FROM predictions ORDER BY created_at DESC LIMIT 5")
        rows = cursor.fetchall()
        for row in rows:
            print(dict(row))

if __name__ == "__main__":
    inspect()
