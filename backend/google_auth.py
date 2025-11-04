import os
from httpx_oauth.clients.google import GoogleOAuth2

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
    raise RuntimeError("Google OAuth credentials must be set in environment variables.")

REDIRECT_URI = f"{BACKEND_URL}/auth/google/callback"

google_client = GoogleOAuth2(
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    scope=["openid", "email", "profile"],
)