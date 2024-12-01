from __future__ import print_function
import datetime
import pickle
import os.path
import base64

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
        with open('token.pickle','wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)


    # Calculate the timestamp for one hour ago
    one_hour_ago = datetime.datetime.now(datetime.UTC) - datetime.timedelta(hours=2)
    one_hour_ago_timestamp = int(one_hour_ago.timestamp())

    # Fetch emails received after the timestamp
    results = service.users().messages().list(userId='me', q='after:' + str(one_hour_ago_timestamp)).execute()
    messages = results.get('messages', [])

    if not messages:
        print('No new emails found.')
    else:
        print('New emails found:')
        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id'], format='full').execute()
            headers = msg['payload']['headers']
            subject = next(header['value'] for header in headers if header['name'] == 'Subject')
            from_email = next(header['value'] for header in headers if header['name'] == 'From')
            date = next(header['value'] for header in headers if header['name'] == 'Date')
            
            print(f"From: {from_email}")
            print(f"Subject: {subject}")
            print(f"Date: {date}")
            print(f"Snippet: {msg['snippet']}")
            print(f"Message ID: {message['id']}")
            print("\n")

            # Decode the full message body
            def get_message_body(payload):
                body = ""
                if 'parts' in payload:
                    for part in payload['parts']:
                        if part['mimeType'] == 'text/plain':
                            body += base64.urlsafe_b64decode(part['body']['data']).decode('utf-8')
                        elif part['mimeType'] == 'multipart/alternative':
                            body += get_message_body(part)
                else:
                    body = base64.urlsafe_b64decode(payload['body']['data']).decode('utf-8')
                return body

            full_body = get_message_body(msg['payload'])
            print(f"Full Body: {full_body}")

if __name__ == '__main__':
    main()
