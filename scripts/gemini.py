import json
import re
import google.generativeai as genai
from pydantic import BaseModel, ValidationError

# Configure the Generative AI (replace with your actual key)
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})

# Pydantic model (unchanged)

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

# Load email data (unchanged)
with open('./sample-mail-response.json', 'r') as file:
    email_data = json.load(file)

analyze_emails_with_ai(email_data)
