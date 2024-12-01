import json
import re
import google.generativeai as genai
from pydantic import BaseModel, ValidationError

# Configure the Generative AI (replace with your actual key)
genai.configure(api_key="AIzaSyAlIT4UaBB-rqe7Ofx-HCLx4NQJ6grt1EM")
model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})

# Pydantic model (unchanged)
class EmailAnalysis(BaseModel):
    is_job_update: bool
    company_name: str
    application_status: str
    summary: str
    position: str
    date: str
    suggested_action: str


def analyze_emails_with_ai(email_data):
    for email in email_data:
        prompt = f"Analyze the following email and determine if it's a job application email. If it is, extract the company name, application status, a short summary, and suggested action.  Please output ONLY valid JSON in the following format:\n{{'is_job_update': bool, 'position': 'string', 'date': 'string', 'company_name': 'string', 'application_status': 'string', 'summary': 'string', 'suggested_action': 'string'}}\nSubject: {
            email['subject']}\n\nBody: {email['full_body']}\n\nDate: {email['date']} Give only the json reponse in text format nothing else"
        response = model.generate_content(prompt)
        print(response.text)

# Load email data (unchanged)
with open('./sample-mail-response.json', 'r') as file:
    email_data = json.load(file)

analyze_emails_with_ai(email_data)
