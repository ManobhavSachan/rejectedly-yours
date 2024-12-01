import json
import psycopg2
from datetime import datetime
from os import getenv
import os
from dotenv import load_dotenv
from urllib.parse import urlparse
# Define the possible statuses
STATUS_OPTIONS = {
    "applied",
    "in_progress",
    "interview",
    "rejected",
    "job_offered",
    "accepted",
    "no_reply"
}

# Function to insert data into Neon database
def insert_into_neon(data):
    tmpPostgres = urlparse(os.getenv("DATABASE_URL"))

    # Establish a connection to the Neon database
    conn = psycopg2.connect(
        dbname='YOUR_DBNAME',
        user='YOUR_USER',
        password='YOUR_PASSWORD',
        host='YOUR_HOST',
        port=5432
    )
    
    cursor = conn.cursor()

    # Insert data into the database
    insert_query = """
    INSERT INTO emails (position, company, status, sender_mail, summary, suggested_action, message_id, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    # Assuming 'data' is a dictionary parsed from JSON
    position = data.get('position', 'Unknown Position')
    company = data.get('company', 'Unknown Company')
    status = data.get('status', 'no_reply')  # Default to 'no_reply' if status is missing
    sender_mail = data.get('sender_email', 'default@example.com')  # Provide a default or handle missing data
    summary = data.get('summary', '')
    suggested_action = data.get('suggested_action', '')
    message_id = data.get('message_id', '')

    # Insert into the database
    cursor.execute(insert_query, (
        position,
        company,
        status,
        sender_mail,
        summary,
        suggested_action,
        message_id,
        datetime.now(),  # created_at
        datetime.now()   # updated_at
    ))

    # Commit the transaction and close the connection
    conn.commit()
    cursor.close()
    conn.close()

# Read the sample Gemini response JSON
def process_gemini_response(json_response):
    data_list = json.loads(json_response)
    # Assuming data_list is a list of data entries
    for data in data_list:
        print(data)
        insert_into_neon(data)

# Example usage

process_gemini_response(open('./sample-gemini-response.json').read())

