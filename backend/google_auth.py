import os
from authlib.integrations.starlette_client import OAuth
from httpx import AsyncClient

# Load environment variables
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Define the redirect URI
REDIRECT_URI = f"{BACKEND_URL}/auth/google/callback"

class GoogleAuth:
    def __init__(self):
        self.oauth = OAuth()
        self.oauth.register(
            name='google',
            client_id=GOOGLE_CLIENT_ID,
            client_secret=GOOGLE_CLIENT_SECRET,
            server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
            client_kwargs={'scope': 'openid email profile'}
        )
        self.session = AsyncClient()

    async def get_authorization_url(self, redirect_uri: str):
        return await self.oauth.google.authorize_redirect(redirect_uri)

    async def get_access_token(self, code: str, redirect_uri: str):
        return await self.oauth.google.authorize_access_token(code=code, redirect_uri=redirect_uri)

    async def get_id_email(self, token: str):
        async with self.session.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {token}"},
        ) as resp:
            if resp.status == 200:
                data = await resp.json()
                # --- Η ΚΡΙΣΙΜΗ ΔΙΟΡΘΩΣΗ ΕΙΝΑΙ ΕΔΩ ---
                # Πρέπει να επιστρέφει 3 στοιχεία: sub (id), email, και name
                return data.get("sub"), data.get("email"), data.get("name")
            # Επιστρέφει 3 None σε περίπτωση σφάλματος για να αποφευχθεί το unpack error
            return None, None, None

    async def close_session(self):
        await self.session.aclose()

google_client = GoogleAuth()