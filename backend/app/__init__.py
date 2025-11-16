import os
from flask import Flask
from supabase import create_client
from dotenv import load_dotenv
from flask_cors import CORS


def create_app():
    load_dotenv()  # Load .env

    app = Flask(__name__)
    CORS(app)  # Enable CORS

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    app.supabase = create_client(supabase_url, supabase_key)

    # Import blueprints
    from .submit import submit_bp
    from .results import results_bp
    from .data import data_bp

    # Register your blueprints
    app.register_blueprint(submit_bp)
    app.register_blueprint(results_bp)
    app.register_blueprint(data_bp)

    return app