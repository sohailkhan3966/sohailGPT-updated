<<<<<<< HEAD
from flask import Flask, request, jsonify, session
from flask_cors import CORS # Import CORS
import os # Import os for environment variables

from .memory_functions import get_user_memory, update_user_memory
# Make sure firebase_setup is imported to initialize Firebase when the app starts
from . import firebase_setup 

app = Flask(__name__)

# --- CORS Configuration ---
# For development, allow all. For production on Render, you'll set specific origins.
# We will print a reminder to configure this more strictly later.
CORS(app) 
# Example for stricter CORS (you'll use this later with your Vercel URL):
# VERCEL_FRONTEND_URL = os.environ.get('VERCEL_FRONTEND_URL')
# if VERCEL_FRONTEND_URL:
#     CORS(app, resources={
#         r"/chat": {"origins": VERCEL_FRONTEND_URL},
#         r"/set_name": {"origins": VERCEL_FRONTEND_URL}
#     })
# else:
#     CORS(app) # Fallback if VERCEL_FRONTEND_URL is not set

# --- Flask Secret Key ---
# Load secret key from environment variable for production, with a fallback for development.
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'your_very_secret_flask_key_for_dev_only_CHANGE_ME')
if app.secret_key == 'your_very_secret_flask_key_for_dev_only_CHANGE_ME' and os.environ.get('FLASK_ENV') == 'production':
    print("WARNING: Using default Flask secret key in production! Set FLASK_SECRET_KEY environment variable.")

# TODO: Implement your OpenAI API call logic here
# You might want to put this in a separate file and import it.
def call_openai_api(prompt_with_memory: str, user_id: str):
    """Placeholder for OpenAI API call."""
    print(f"Simulating OpenAI API call for user {user_id} with prompt:\n{prompt_with_memory}")
    # Replace this with actual API call
    # Example: response_text = openai.Completion.create(model="text-davinci-003", prompt=prompt_with_memory, ...).choices[0].text
    response_text = f"This is a simulated AI response to your message based on memory. You said: {prompt_with_memory.splitlines()[-1]}"
    return response_text

@app.route('/chat', methods=['POST'])
def chat_handler():
    data = request.get_json()
    if not data or 'message' not in data: # Check if 'message' is in data or data['messages'] based on frontend
        # Assuming frontend sends { "messages": [{"role": "user", "content": "Hi"}], "model": "gpt-3o" }
        # Let's adapt to the frontend structure
        if not data or "messages" not in data or not isinstance(data["messages"], list) or not data["messages"]:
            return jsonify({"error": "Missing 'messages' array in request or it is empty."}), 400
        user_message = data['messages'][-1]['content'] # Get content from the last message in the array
    else: # Fallback for older structure if any part of code still uses { "message": "..." }
        user_message = data['message']

    # --- User ID Management (Example: using session) ---
    if 'user_id' not in session:
        import uuid
        session['user_id'] = str(uuid.uuid4())
        print(f"New user session started. User ID: {session['user_id']}")
    
    user_id = session['user_id']

    if not firebase_setup.db:
        return jsonify({"error": "Firestore client not initialized. Cannot process chat."}), 500

    user_memory = get_user_memory(user_id)

    prompt_parts = []
    if user_memory:
        prompt_parts.append("Conversation Memory (for context):")
        if user_memory.get('name'):
            prompt_parts.append(f"- User's name is {user_memory.get('name')}.")
        if user_memory.get('topics'):
            prompt_parts.append(f"- Previously discussed topics: {', '.join(user_memory.get('topics'))}.")
        if user_memory.get('last_interaction_summary'):
            prompt_parts.append(f"- Summary of last interaction: {user_memory.get('last_interaction_summary')}")
        prompt_parts.append("Current Conversation:")
    
    prompt_parts.append(f"User: {user_message}")
    prompt_with_memory = "\n".join(prompt_parts)

    ai_response_text = call_openai_api(prompt_with_memory, user_id)

    updated_memory_data = {
        # 'last_seen': firebase_setup.firestore.SERVER_TIMESTAMP, # Need to import firestore from firebase_admin
        'last_message_sent': user_message,
        'last_ai_response': ai_response_text,
    }
    # Ensure firebase_admin.firestore is available if you want to use SERVER_TIMESTAMP
    # For now, removing it to avoid import error if firestore isn't directly imported here.
    # You can add `from firebase_admin import firestore` at the top if needed for SERVER_TIMESTAMP

    update_user_memory(user_id, updated_memory_data)

    # Construct the response to match what the frontend expects from ChatCompletionResponse
    # The frontend expects: { choices: [{ message: { role: "assistant", content: "response" }}] }
    response_for_frontend = {
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": ai_response_text
                }
            }
        ]
        # Optionally include user_id if frontend needs it, but stick to API contract
        # "user_id_from_flask": user_id 
    }
    return jsonify(response_for_frontend)

@app.route('/set_name', methods=['POST'])
def set_name_handler():
    data = request.get_json()
    if 'user_id' not in session:
        return jsonify({"error": "User session not found. Please start a chat first."}), 400
    if not data or 'name' not in data:
        return jsonify({"error": "Missing name in request"}), 400
    
    user_id = session['user_id']
    user_name = data['name']
    update_user_memory(user_id, {"name": user_name})
    return jsonify({"message": f"Name '{user_name}' saved for user {user_id}."})

if __name__ == '__main__':
    print("Starting Flask app for local development...")
    # Ensure FLASK_SECRET_KEY is set for local dev if you plan to test sessions thoroughly
    if app.secret_key == 'your_very_secret_flask_key_for_dev_only_CHANGE_ME':
        print("WARNING: Using default Flask secret key for development. Consider setting a local FLASK_SECRET_KEY.")
=======
from flask import Flask, request, jsonify, session
from flask_cors import CORS # Import CORS
import os # Import os for environment variables

from .memory_functions import get_user_memory, update_user_memory
# Make sure firebase_setup is imported to initialize Firebase when the app starts
from . import firebase_setup 

app = Flask(__name__)

# --- CORS Configuration ---
# For development, allow all. For production on Render, you'll set specific origins.
# We will print a reminder to configure this more strictly later.
CORS(app) 
# Example for stricter CORS (you'll use this later with your Vercel URL):
# VERCEL_FRONTEND_URL = os.environ.get('VERCEL_FRONTEND_URL')
# if VERCEL_FRONTEND_URL:
#     CORS(app, resources={
#         r"/chat": {"origins": VERCEL_FRONTEND_URL},
#         r"/set_name": {"origins": VERCEL_FRONTEND_URL}
#     })
# else:
#     CORS(app) # Fallback if VERCEL_FRONTEND_URL is not set

# --- Flask Secret Key ---
# Load secret key from environment variable for production, with a fallback for development.
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'your_very_secret_flask_key_for_dev_only_CHANGE_ME')
if app.secret_key == 'your_very_secret_flask_key_for_dev_only_CHANGE_ME' and os.environ.get('FLASK_ENV') == 'production':
    print("WARNING: Using default Flask secret key in production! Set FLASK_SECRET_KEY environment variable.")

# TODO: Implement your OpenAI API call logic here
# You might want to put this in a separate file and import it.
def call_openai_api(prompt_with_memory: str, user_id: str):
    """Placeholder for OpenAI API call."""
    print(f"Simulating OpenAI API call for user {user_id} with prompt:\n{prompt_with_memory}")
    # Replace this with actual API call
    # Example: response_text = openai.Completion.create(model="text-davinci-003", prompt=prompt_with_memory, ...).choices[0].text
    response_text = f"This is a simulated AI response to your message based on memory. You said: {prompt_with_memory.splitlines()[-1]}"
    return response_text

@app.route('/chat', methods=['POST'])
def chat_handler():
    data = request.get_json()
    if not data or 'message' not in data: # Check if 'message' is in data or data['messages'] based on frontend
        # Assuming frontend sends { "messages": [{"role": "user", "content": "Hi"}], "model": "gpt-3o" }
        # Let's adapt to the frontend structure
        if not data or "messages" not in data or not isinstance(data["messages"], list) or not data["messages"]:
            return jsonify({"error": "Missing 'messages' array in request or it is empty."}), 400
        user_message = data['messages'][-1]['content'] # Get content from the last message in the array
    else: # Fallback for older structure if any part of code still uses { "message": "..." }
        user_message = data['message']

    # --- User ID Management (Example: using session) ---
    if 'user_id' not in session:
        import uuid
        session['user_id'] = str(uuid.uuid4())
        print(f"New user session started. User ID: {session['user_id']}")
    
    user_id = session['user_id']

    if not firebase_setup.db:
        return jsonify({"error": "Firestore client not initialized. Cannot process chat."}), 500

    user_memory = get_user_memory(user_id)

    prompt_parts = []
    if user_memory:
        prompt_parts.append("Conversation Memory (for context):")
        if user_memory.get('name'):
            prompt_parts.append(f"- User's name is {user_memory.get('name')}.")
        if user_memory.get('topics'):
            prompt_parts.append(f"- Previously discussed topics: {', '.join(user_memory.get('topics'))}.")
        if user_memory.get('last_interaction_summary'):
            prompt_parts.append(f"- Summary of last interaction: {user_memory.get('last_interaction_summary')}")
        prompt_parts.append("Current Conversation:")
    
    prompt_parts.append(f"User: {user_message}")
    prompt_with_memory = "\n".join(prompt_parts)

    ai_response_text = call_openai_api(prompt_with_memory, user_id)

    updated_memory_data = {
        # 'last_seen': firebase_setup.firestore.SERVER_TIMESTAMP, # Need to import firestore from firebase_admin
        'last_message_sent': user_message,
        'last_ai_response': ai_response_text,
    }
    # Ensure firebase_admin.firestore is available if you want to use SERVER_TIMESTAMP
    # For now, removing it to avoid import error if firestore isn't directly imported here.
    # You can add `from firebase_admin import firestore` at the top if needed for SERVER_TIMESTAMP

    update_user_memory(user_id, updated_memory_data)

    # Construct the response to match what the frontend expects from ChatCompletionResponse
    # The frontend expects: { choices: [{ message: { role: "assistant", content: "response" }}] }
    response_for_frontend = {
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": ai_response_text
                }
            }
        ]
        # Optionally include user_id if frontend needs it, but stick to API contract
        # "user_id_from_flask": user_id 
    }
    return jsonify(response_for_frontend)

@app.route('/set_name', methods=['POST'])
def set_name_handler():
    data = request.get_json()
    if 'user_id' not in session:
        return jsonify({"error": "User session not found. Please start a chat first."}), 400
    if not data or 'name' not in data:
        return jsonify({"error": "Missing name in request"}), 400
    
    user_id = session['user_id']
    user_name = data['name']
    update_user_memory(user_id, {"name": user_name})
    return jsonify({"message": f"Name '{user_name}' saved for user {user_id}."})

if __name__ == '__main__':
    print("Starting Flask app for local development...")
    # Ensure FLASK_SECRET_KEY is set for local dev if you plan to test sessions thoroughly
    if app.secret_key == 'your_very_secret_flask_key_for_dev_only_CHANGE_ME':
        print("WARNING: Using default Flask secret key for development. Consider setting a local FLASK_SECRET_KEY.")
>>>>>>> 819db223 (first commit)
    app.run(host='0.0.0.0', port=5001, debug=True) 