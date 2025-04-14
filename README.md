# Student Data API

This project provides a simple Express.js API to access (Dummy) student data stored in a PostgreSQL database on our free AWS Tier.

## Overview

The API serves data from several tables related to different aspects of student information:

- Academic
- Career
- Demographic
- Financial
- General
- Health

## Data Structure

The primary key linking all tables is `student_id_number`. While this key can be used to join information across different tables for a single student, please note that the data provided is generic dummy data. Consequently, the combined information for any given `student_id_number` may not always represent a realistic or logically consistent student profile.

## Dummy Data

This repository includes a `Dummy-Data/` directory containing CSV files used to populate the database tables with sample data. These files were used for initial setup and testing.

## API Endpoints

The following GET endpoints are available:

- `/api/academic`: Retrieves data from the `student_academic` table.
- `/api/career`: Retrieves data from the `student_career` table.
- `/api/demographic`: Retrieves data from the `student_demographic` table.
- `/api/financial`: Retrieves data from the `student_financial` table.
- `/api/general`: Retrieves data from the `student_general` table.
- `/api/health`: Retrieves data from the `student_health` table.

## Live API Endpoints

The following endpoints are publicly accessible with the live data:

- General: [https://api.stonecreekforms.link/api/general](https://api.stonecreekforms.link/api/general)
- Demographic: [https://api.stonecreekforms.link/api/demographic](https://api.stonecreekforms.link/api/demographic)
- Health: [https://api.stonecreekforms.link/api/health](https://api.stonecreekforms.link/api/health)
- Financial: [https://api.stonecreekforms.link/api/financial](https://api.stonecreekforms.link/api/financial)
- Career: [https://api.stonecreekforms.link/api/career](https://api.stonecreekforms.link/api/career)
- Academic: [https://api.stonecreekforms.link/api/academic](https://api.stonecreekforms.link/api/academic)

## Setup

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:cliftonbnoble/student-data-api.git
    cd student-data-api
    ```
2.  **Install dependencies:** (Assuming Node.js setup)
    ```bash
    npm install
    ```
    _Note: You might need to create a `package.json` if you haven't already._
3.  **Set up PostgreSQL Database:**
    - Ensure you have PostgreSQL running.
    - Create a database (e.g., `student-data-db`).
    - Create the necessary tables using the SQL schema provided or inferred from the CSV headers.
    - Load the data from the CSV files in the `Dummy-Data/` directory into the corresponding tables (e.g., using `psql`'s `\copy` command).
4.  **Configure Environment Variables:**
    - Create a `.env` file in the `school-data-api/` directory.
    - Add the following variables, replacing the values with your actual database credentials:
      ```env
      DB_USER=your_db_user
      DB_HOST=your_db_host
      DB_DATABASE=your_db_name
      DB_PASSWORD=your_db_password
      DB_PORT=your_db_port
      PORT=5001 # Or any port you prefer for the API
      ```
5.  **Start the API:**
    ```bash
    cd school-data-api
    node index.js
    ```

The API should now be running, typically on `http://localhost:5001`.
