from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI= os.getenv("MONGODB_URI")

ALLOWED_EXTENSION=[".pdf", ".txt"]
MAX_FILE_MB=10


UPLOAD_DIR="uploads"

GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")




class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str
    REDIS_URL: str
    JWT_SECRET: str
    JWT_ALG: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 10080

    S3_ENDPOINT: str
    S3_ACCESS_KEY: str
    S3_SECRET_KEY: str
    S3_BUCKET: str
    S3_REGION: str = "us-east-1"

    GEMINI_API_KEY: str
    GEMINI_EMBED_MODEL: str = "models/text-embedding-004"
    GEMINI_CHAT_MODEL: str = "gemini-3.5-flash"

    QDRANT_URL: str
    QDRANT_API_KEY: str = ""

    MAX_UPLOAD_MB: int = 25
    EMBED_BATCH: int = 100
    CHUNK_TOKENS: int = 512
    CHUNK_OVERLAP: int = 64

settings = Settings()