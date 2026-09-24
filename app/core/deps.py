from fastapi import Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.security import decode_token
from app.models.models import User

def get_current_user(
    authorization: str = Header(...),
    db: Session = Depends(get_db),
) -> User:
    if not authorization.startswith("Bearer "):
        raise HTTPException(401, "missing bearer")
    try:
        uid = decode_token(authorization.removeprefix("Bearer ").strip())
    except ValueError:
        raise HTTPException(401, "invalid token")
    user = db.get(User, uid)
    if not user:
        raise HTTPException(401, "user not found")
    return user