from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class Document(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: str                          
    user_id: str
    filename: str
    mime_type: str
    size_bytes: int
    storage_key: str
    status: str = "queued"          
    page_count: Optional[int] = None
    token_count: Optional[int] = None
    sha256: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ready_at: Optional[datetime] = None

    @classmethod
    def from_mongo(cls, doc: dict) -> "Document":
        doc = dict(doc)
        if "_id" in doc:
            doc["id"] = str(doc.pop("_id"))
        return cls(**doc)
    
