#!/usr/bin/env python3
""" Module of Users views
"""
from api.v1.views import app_views
from flask import abort, jsonify, request
from models.user import User
import os

@app_views.route('/auth_session/login', methods=['POST'], strict_slashes=False)
def session_login(email: str=None, password: str=None) -> str:
    """Sesssion Login"""
    email = request.form.get("email")
    password = request.form.get("password")
    if not email:
        return jsonify({"error": "email missing"}), 400
    if not password:
        return jsonify({"error": "password missing"}), 400
    users = User.search({"email": email})
    if not users:
        return jsonify({"error": "no user found for this email"}), 404
    for user in users:
        if user.is_valid_password(password):
            from api.v1.app import auth
            session_id = str(auth.create_session(user.email))
            result = jsonify(user.to_json())
            result.set_cookie(str(os.getenv("SESSION_NAME")), session_id)
            return result
        return ({"error": "wrong password"}), 401
