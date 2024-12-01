from __future__ import print_function
import datetime
import pickle
import os.path
import base64
import json
import psycopg2
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from urllib.parse import urlparse
import google.generativeai as genai
from pydantic import BaseModel

# Configure the Generative AI (replace with your actual key)
genai.configure(api_key="AIzaSyAlIT4UaBB-rqe7Ofx-HCLx4NQJ6grt1EM")
model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})

SCOPES = ['https://mail.google.com/']

STATUS_OPTIONS = {
    "applied",
    "in_progress",
    "interview",
    "rejected",
    "job_offered",
    "accepted",
    "no_reply"
}

class EmailAnalysis(BaseModel):
    is_job_update: bool
    company_name: str
    application_status: str
    summary: str
    position: str
    date: str
    suggested_action: str
    status: str
    sender_email: str

def run_gmail_script():
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)
    one_hour_ago = datetime.datetime.now(datetime.UTC) - datetime.timedelta(hours=2)
    one_hour_ago_timestamp = int(one_hour_ago.timestamp())

    results = service.users().messages().list(userId='me', q='after:' + str(one_hour_ago_timestamp)).execute()
    messages = results.get('messages', [])

    if not messages:
        print('No new emails found.')
    else:
        print('New emails found:')
        emails_data = []
        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id'], format='full').execute()
            headers = msg['payload']['headers']
            subject = next(header['value'] for header in headers if header['name'] == 'Subject')
            from_email = next(header['value'] for header in headers if header['name'] == 'From')
            date = next(header['value'] for header in headers if header['name'] == 'Date')

            def get_message_body(payload):
                body = ""
                if 'parts' in payload:
                    for part in payload['parts']:
                        if part['mimeType'] == 'text/plain':
                            body += base64.urlsafe_b64decode(part['body']['data']).decode('utf-8')
                        elif part['mimeType'] == 'multipart/alternative':
                            for subpart in part.get('parts', []):
                                if subpart['mimeType'] == 'text/plain':
                                    body += base64.urlsafe_b64decode(subpart['body']['data']).decode('utf-8')
                elif payload['mimeType'] == 'text/plain':
                    body = base64.urlsafe_b64decode(payload['body']['data']).decode('utf-8')
                return body

            full_body = get_message_body(msg['payload'])

            email_data = {
                "from": from_email,
                "subject": subject,
                "date": date,
                "snippet": msg['snippet'],
                "message_id": message['id'],
                "full_body": full_body
            }
            emails_data.append(email_data)

        emails_json = json.dumps(emails_data, indent=4)
        print(emails_json)
        return emails_data

def analyze_emails_with_ai(email_data):
    for email in email_data:
        prompt = f"""Analyze the following email and determine if it's a job application email. If it is, extract the company name, application status, a short summary, and suggested action, sender, date. Please output ONLY valid JSON in the following format:
        {{
            'is_job_update': bool,
            'message_id': 'string',
            'position': 'string',
            'date': 'string',
            'company_name': 'string',
            'summary': 'string',
            'suggested_action': 'string',
            'status': 'applied' | 'in_progress' | 'interview' | 'rejected' | 'job_offered' | 'accepted' | 'no_reply',
            'sender_email': 'string'
        }}
        Subject: {email['subject']}
        Body: {email['full_body']}
        Sender: {email['from']}
        Date: {email['date']}
        Snippet: {email['snippet']}
        Message ID: {email['message_id']}
        Give only the json response in text format nothing else"""
        response = model.generate_content(prompt)
        print(response.text)
        try:
            analysis = EmailAnalysis.parse_raw(response.text)
            yield analysis.dict()
        except ValidationError as e:
            print(f"Validation error: {e}")

def insert_into_neon(data):
    tmpPostgres = urlparse(os.getenv("DATABASE_URL"))

    conn = psycopg2.connect(
        dbname='mails',
        user='mails_owner',
        password='FZrd7iIc2nXu',
        host='ep-twilight-hall-a50hxbf5.us-east-2.aws.neon.tech',
        port=5432
    )
    
    cursor = conn.cursor()

    insert_query = """
    INSERT INTO emails (position, company, status, sender_mail, summary, suggested_action, message_id, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    position = data.get('position', 'Unknown Position')
    company = data.get('company', 'Unknown Company')
    status = data.get('status', 'no_reply')
    sender_mail = data.get('sender_email', 'default@example.com')
    summary = data.get('summary', '')
    suggested_action = data.get('suggested_action', '')
    message_id = data.get('message_id', '')

    cursor.execute(insert_query, (
        position,
        company,
        status,
        sender_mail,
        summary,
        suggested_action,
        message_id,
        datetime.now(),
        datetime.now()
    ))

    conn.commit()
    cursor.close()
    conn.close()

def main():
    email_data = run_gmail_script()
    if email_data:
        analyzed_data = analyze_emails_with_ai(email_data)
        for data in analyzed_data:
            insert_into_neon(data)

if __name__ == "__main__":
    main()