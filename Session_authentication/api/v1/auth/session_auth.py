#!/usr/bin/env python3
"""This module is for the Session Authenication
class"""
from api.v1.auth.auth import Auth
import os
import uuid
from models.user import User


class SessionAuth(Auth):
    """Session Auth class that inheirts
    from Auth class"""
    def __init__(self):
        super().__init__()

    user_id_by_session_id = {}

    def create_session(self, user_id: str = None) -> str:
        """Creates a session type session"""
        if user_id is None or not isinstance(user_id, str):
            return None
        else:
            session_id = str(uuid.uuid4())
            self.user_id_by_session_id[session_id] = user_id
            return session_id

    def user_id_for_session_id(self,
                               session_id: str = None) -> str:
        """Returns User Id based on Session Id"""
        if session_id is None or not isinstance(session_id, str):
            return None
        return self.user_id_by_session_id.get(session_id)

    def current_user(self, request=None):
        """Overload that returns a cookie value"""
        sess_name = self.session_cookie(request)
        user_id = self.user_id_for_session_id(sess_name)
        user = User.get(user_id)
        print(user)
        return user






