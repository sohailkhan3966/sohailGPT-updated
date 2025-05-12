<<<<<<< HEAD
from .firebase_setup import db

def get_user_memory(user_id: str):
    """Fetches user memory from Firestore."""
    if not db:
        print("Firestore client not initialized. Cannot get user memory.")
        return {}
    try:
        doc_ref = db.collection('user_memory').document(user_id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        return {}
    except Exception as e:
        print(f"Error getting user memory for user {user_id}: {e}")
        return {}

def update_user_memory(user_id: str, memory_data: dict):
    """Updates (merges) user memory in Firestore."""
    if not db:
        print("Firestore client not initialized. Cannot update user memory.")
        return
    try:
        doc_ref = db.collection('user_memory').document(user_id)
        doc_ref.set(memory_data, merge=True)
        print(f"Memory updated for user {user_id}")
    except Exception as e:
        print(f"Error updating user memory for user {user_id}: {e}")

def delete_user_memory(user_id: str):
    """Deletes user memory from Firestore (optional reset)."""
    if not db:
        print("Firestore client not initialized. Cannot delete user memory.")
        return
    try:
        db.collection('user_memory').document(user_id).delete()
        print(f"Memory deleted for user {user_id}")
    except Exception as e:
=======
from .firebase_setup import db

def get_user_memory(user_id: str):
    """Fetches user memory from Firestore."""
    if not db:
        print("Firestore client not initialized. Cannot get user memory.")
        return {}
    try:
        doc_ref = db.collection('user_memory').document(user_id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        return {}
    except Exception as e:
        print(f"Error getting user memory for user {user_id}: {e}")
        return {}

def update_user_memory(user_id: str, memory_data: dict):
    """Updates (merges) user memory in Firestore."""
    if not db:
        print("Firestore client not initialized. Cannot update user memory.")
        return
    try:
        doc_ref = db.collection('user_memory').document(user_id)
        doc_ref.set(memory_data, merge=True)
        print(f"Memory updated for user {user_id}")
    except Exception as e:
        print(f"Error updating user memory for user {user_id}: {e}")

def delete_user_memory(user_id: str):
    """Deletes user memory from Firestore (optional reset)."""
    if not db:
        print("Firestore client not initialized. Cannot delete user memory.")
        return
    try:
        db.collection('user_memory').document(user_id).delete()
        print(f"Memory deleted for user {user_id}")
    except Exception as e:
>>>>>>> 819db223 (first commit)
        print(f"Error deleting user memory for user {user_id}: {e}") 