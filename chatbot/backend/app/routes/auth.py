from flask import Blueprint, request, jsonify
from app.models.user import User
from app.utils.password_hashing import verify_password
from app import db


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if User.find_by_email(db, email):
        return jsonify({"error": "User already exists"}), 400

    user = User(email, password)
    user_id = user.save(db)  # Save user and get their _id
    return jsonify({"message": "User created successfully", "user_id": str(user_id)}), 201
    
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.find_by_email(db, email)
    if not user or not verify_password(password, user['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "user_id": str(user["_id"])}), 200