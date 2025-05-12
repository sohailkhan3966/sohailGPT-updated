import sys
import os

# Add the flask_backend directory to the Python path
sys.path.insert(0, os.path.abspath('flask_backend'))

# Import the Flask app
from app import app

# This is what Gunicorn will look for
if __name__ == "__main__":
    app.run() 