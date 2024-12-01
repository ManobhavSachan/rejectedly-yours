# Rejectedly Yours

Rejectedly Yours is a comprehensive application designed to help users track their job application statuses by integrating with Gmail and utilizing AI to analyze email content. The application is built using a combination of Python for backend processing and Next.js for the frontend interface.

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

## Installation

### Prerequisites

- Node.js and npm
- Python 3.9 or later
- PostgreSQL
- Google Cloud account for API access

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rejectedly-yours.git
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

## Configuration

- **Google API**: Ensure you have a valid `credentials.json` file for Google API access.
- **Database**: Update the database connection details in the `.env` file.

## Project Structure

- **scripts/**: Contains Python scripts for backend processing.
  - `script.py`: Main script for fetching and analyzing emails.
  - `neon.py`: Handles database interactions.
  - `gemini.py`: AI analysis script.

- **frontend/**: Contains the Next.js frontend application.
  - `components/`: React components for the UI.
  - `pages/`: Next.js pages for routing.
  - `utils/`: Utility functions and API interactions.

- **.gitignore**: Specifies files and directories to be ignored by Git.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
