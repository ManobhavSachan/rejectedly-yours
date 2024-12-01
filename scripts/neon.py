import json
from datetime import datetime

# Define the possible statuses
STATUS_OPTIONS = {
    "Applied",
    "In Progress",
    "Interview",
    "Rejected",
    "Job Offer",
    "Accepted",
    "No Reply"
}

def is_job_status_update(mail_response):
    """Check if the mail response contains job status update information."""
    return (
        mail_response and
        'status' in mail_response and
        mail_response['status'] in STATUS_OPTIONS and
        'id' in mail_response
    )

def create_update_dict(mail_response):
    """Create a dictionary for updating if the mail response is a job status update."""
    if is_job_status_update(mail_response):
        return {
            "id": mail_response['id'],
            "title": mail_response.get('title', ''),
            "company": mail_response.get('company', ''),
            "status": mail_response['status'],
            "date": datetime.now().strftime('%Y-%m-%d')  # Current date
        }
    return None

# Example usage
with open('sample-mail-response.json', 'r') as file:
    mail_response = json.load(file)

update_dict = create_update_dict(mail_response)

if update_dict:
    print('Job status update dictionary:', update_dict)
else:
    print('No job status update found.')
