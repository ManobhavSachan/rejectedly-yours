from __future__ import print_function
import datetime
import pickle
import os.path
import base64
import json

from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

# If modifying these scopes, delete the file token.pickle.

SCOPES = ['https://mail.google.com/']


def main():
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for
    # the first time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)

    # Calculate the timestamp for one hour ago
    one_hour_ago = datetime.datetime.now(
        datetime.UTC) - datetime.timedelta(hours=2)
    one_hour_ago_timestamp = int(one_hour_ago.timestamp())

    # Fetch emails received after the timestamp
    results = service.users().messages().list(
        userId='me', q='after:' + str(one_hour_ago_timestamp)).execute()
    messages = results.get('messages', [])

    if not messages:
        print('No new emails found.')
    else:
        print('New emails found:')
        emails_data = []  # List to store email data
        for message in messages:
            msg = service.users().messages().get(
                userId='me', id=message['id'], format='full').execute()
            headers = msg['payload']['headers']
            subject = next(header['value']
                           for header in headers if header['name'] == 'Subject')
            from_email = next(header['value']
                              for header in headers if header['name'] == 'From')
            date = next(header['value']
                        for header in headers if header['name'] == 'Date')

            # Decode the full message body
            def get_message_body(payload):
                body = ""
                if 'parts' in payload:
                    for part in payload['parts']:
                        if part['mimeType'] == 'text/plain':
                            body += base64.urlsafe_b64decode(
                                part['body']['data']).decode('utf-8')
                        elif part['mimeType'] == 'multipart/alternative':
                            # Check for text/plain within multipart/alternative
                            for subpart in part.get('parts', []):
                                if subpart['mimeType'] == 'text/plain':
                                    body += base64.urlsafe_b64decode(
                                        subpart['body']['data']).decode('utf-8')
                elif payload['mimeType'] == 'text/plain':
                    body = base64.urlsafe_b64decode(
                        payload['body']['data']).decode('utf-8')
                return body

            full_body = get_message_body(msg['payload'])

            # Collect email data into a dictionary
            email_data = {
                "from": from_email,
                "subject": subject,
                "date": date,
                "snippet": msg['snippet'],
                "message_id": message['id'],
                "full_body": full_body
            }
            emails_data.append(email_data)

        # Convert the list of email data to JSON
        emails_json = json.dumps(emails_data, indent=4)
        print(emails_json)


if __name__ == '__main__':
    main()
