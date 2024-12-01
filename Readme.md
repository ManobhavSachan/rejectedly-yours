# Rejectedly Yours

## Introduction

**I understand if you don't have time to read the whole file, so watch this video and Images to understand the project in a nutshell. :)
You can now have a dashboard to view the status of your job application, add calendar events, and send follow-up emails in a click, all powered by LLM so you don't make a mistake. :)**

Rejectedly Yours is a comprehensive application designed to help users track their job application statuses by integrating with Gmail and utilising AI to analyze email content. The application is built using a combination of Python for backend processing and Next.js for the frontend interface.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Email Integration**: Connects to Gmail to fetch recent emails.
- **AI Analysis**: Uses Google's Generative AI to analyze emails and extract job application details.
- **Database Storage**: Stores analyzed data in a PostgreSQL database hosted on Neon.
- **Frontend Interface**: Provides a user-friendly interface to view and manage job applications.
- **Automated Fetching**: Automates the fetching and processing of emails using Kestra.

## Snapshots

Live working demo images of the project.
<img width="1440" alt="Screenshot 2024-12-01 at 4 41 00 PM" src="https://github.com/user-attachments/assets/6d602277-3adf-41a3-921d-4c94ecfe2649">
<img width="1440" alt="Screenshot 2024-12-01 at 4 40 38 PM" src="https://github.com/user-attachments/assets/b5fe265e-c414-47aa-b86b-2f1c0d790373">
<img width="1440" alt="Screenshot 2024-12-01 at 4 40 29 PM" src="https://github.com/user-attachments/assets/a805b0b9-09f2-4d36-b28c-47ecc6de757a">
<img width="1440" alt="Screenshot 2024-12-01 at 4 40 22 PM" src="https://github.com/user-attachments/assets/1c7abe87-55d5-47b0-a26c-0a1641ad2a1a">



## Installation

### Prerequisites

- Node.js and npm
- Python 3.9 or later
- PostgreSQL
- Google Cloud account for API access
- Kestra account for scheduling

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ManobhavSachan/rejectedly-yours.git
   cd rejectedly-yours
   ```

2. Set up a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   - Create a `.env` file in the `scripts` directory with your database and API credentials.

4. Run the backend script:
   ```bash
   python scripts/script.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Email Fetching**: The backend script fetches emails from Gmail and analyzes them using AI.
- **Data Viewing**: The frontend displays job application data, allowing users to track their application statuses.
- **Automated Fetching**: The Kestra workflow automates the fetching and processing of emails.

## Configuration

- **Google API**: Ensure you have a valid `credentials.json` file for Google API access.
- **Database**: Update the database connection details in the `.env` file.
- **Kestra**: Configure the Kestra workflow to run the Python script at the desired interval.

## Project Structure

- **scripts/**: Contains Python scripts for backend processing.
  - `script.py`: Main script for fetching and analyzing emails.
  - `neon.py`: Handles database interactions.
  - `gemini.py`: AI analysis script.
  - `gmail.py`: Email fetching script.
  - `kestra.yaml`: Kestra workflow configuration.

- **frontend/**: Contains the Next.js frontend application.
  - `components/`: React components for the UI.
  - `pages/`: Next.js pages for routing.
  - `utils/`: Utility functions and API interactions.
  - `public/`: Static assets.
  - `package.json`: Node.js package configuration.
  - `next.config.js`: Next.js configuration.

- **.gitignore**: Specifies files and directories to be ignored by Git.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
