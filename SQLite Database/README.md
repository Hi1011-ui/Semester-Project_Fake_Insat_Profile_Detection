# SQLite Database Layer

This directory contains the database module for storing prediction history in the Fake Instagram Profile Detector.

## Contents
- `database.py`: The main module that provides functions to interact with the database (`init_db`, `add_prediction`, `get_history`).
- `schema.sql`: The SQL statements used to create the `predictions` table.
- `init_db.py`: A script to manually initialize the database.
- `inspect_db.py`: A script to view the current database schema and recent rows.
- `docs/database_design.md`: Detailed documentation and ER diagram of the database schema.
- `tests/`: Unit tests for the database operations.

## Database Location
The database is stored locally in `predictions.db` within this folder. This file is automatically created on the first prediction if it doesn't exist. It is ignored by Git, as it contains runtime application data.

To override the location of the database (e.g., for testing), set the `FPD_DB_PATH` environment variable.

## Setup and Reset
- **Initialization:** The database is initialized automatically the first time it is accessed. No manual setup is required.
- **Reset:** To reset the database, simply delete the `predictions.db` file. A new, empty database will be created on the next prediction request. Note that running backend tests will insert dummy records into the real database unless tests are configured to use a temporary one.
- **Inspection:** Run `python inspect_db.py` to view the current state of the database.
