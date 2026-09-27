from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI= os.getenv("MONGODB_URI")


JWT_SECRET = os.getenv("JWT_SECRET", "change-me-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60 * 24 * 7  


ALLOWED_EXTENSION=[".pdf", ".txt"]
MAX_FILE_MB=10

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

UPLOAD_DIR="uploads"
GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")