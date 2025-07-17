from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
import os

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///testprep.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})

    # Import models after db initialization to avoid circular imports
    from . import models
    
    # Register blueprints or routes
    from . import routes
    app.register_blueprint(routes.main)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app
