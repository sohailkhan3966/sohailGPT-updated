import firebase_admin
from firebase_admin import credentials, firestore
import os
import json # For parsing JSON string from env var

db = None

try:
    # Attempt to load Firebase credentials from an environment variable (for Render)
    firebase_creds_json_str = os.environ.get('FIREBASE_CREDS_JSON')
    
    if firebase_creds_json_str:
        print("Found FIREBASE_CREDS_JSON environment variable. Attempting to initialize Firebase...")
        firebase_creds_dict = json.loads(firebase_creds_json_str)
        cred = credentials.Certificate(firebase_creds_dict)
    else:
        # Fallback for local development: Load from a local file
        # Ensure this local file is in .gitignore
        print("FIREBASE_CREDS_JSON environment variable not found. Attempting to load from local file for development...")
        SERVICE_ACCOUNT_FILENAME = 'sohailgpt-firebase-adminsdk.json' # Keep your local filename
        # Path relative to this file (firebase_setup.py)
        # Adjust this path if your key file is located differently for local dev
        local_key_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), SERVICE_ACCOUNT_FILENAME)
        if not os.path.exists(local_key_path):
             # Attempt to find it in the project root as a fallback for previous structure
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            local_key_path = os.path.join(BASE_DIR, SERVICE_ACCOUNT_FILENAME)
            print(f"Local key not found in flask_backend, trying project root: {local_key_path}")

        if os.path.exists(local_key_path):
            print(f"Attempting to load Firebase service account key from local path: {local_key_path}")
            cred = credentials.Certificate(local_key_path)
        else:
            raise FileNotFoundError(f"Firebase service account key file not found for local development at {local_key_path} or in environment variable.")

    # Initialize Firebase app if not already initialized
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
        print("Firebase Admin SDK initialized successfully.")
    else:
        print("Firebase Admin SDK already initialized.")
    
    db = firestore.client()
    print("Firestore client is available.")

except FileNotFoundError as fnf_error:
    print(f"Firebase Initialization Error: {fnf_error}")
    print("For Render deployment, ensure FIREBASE_CREDS_JSON environment variable is set with the content of your service account key.")
    print("For local development, ensure your service account key JSON file is correctly placed and named.")
    db = None
except json.JSONDecodeError as json_error:
    print(f"Error decoding FIREBASE_CREDS_JSON: {json_error}. Ensure it's a valid JSON string.")
    db = None
except Exception as e:
    print(f"General Error initializing Firebase Admin SDK: {e}")
    db = None 