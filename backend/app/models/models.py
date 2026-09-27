import uuid
from datetime import datetime
from sqlalchemy import (String, Text, Integer, BigInteger, ForeignKey, DateTime,
                        Boolean, Numeric, JSON, func)
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from app.core.db import Base

def _uuid(): return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    plan: Mapped[str] = mapped_column(String(20), default="free")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

class Document(Base):
    __tablename__ = "documents"
    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    user_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    filename: Mapped[str] = mapped_column(String(512))
    mime_type: Mapped[str] = mapped_column(String(128))
    size_bytes: Mapped[int] = mapped_column(BigInteger)
    storage_key: Mapped[str] = mapped_column(String(512))
    status: Mapped[str] = mapped_column(String(20), default="queued", index=True)
    page_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    token_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    sha256: Mapped[str] = mapped_column(String(64), index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    ready_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

class Chunk(Base):
    __tablename__ = "chunks"
    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    document_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("documents.id", ondelete="CASCADE"), index=True)
    page: Mapped[int] = mapped_column(Integer)
    char_start: Mapped[int] = mapped_column(Integer)
    char_end: Mapped[int] = mapped_column(Integer)
    text: Mapped[str] = mapped_column(Text)
    token_count: Mapped[int] = mapped_column(Integer)

class Job(Base):
    __tablename__ = "jobs"
    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    document_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("documents.id", ondelete="CASCADE"), index=True)
    type: Mapped[str] = mapped_column(String(20))          # ingest|query
    status: Mapped[str] = mapped_column(String(20), default="queued", index=True)
    progress: Mapped[int] = mapped_column(Integer, default=0)
    worker_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    lease_expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Outbox(Base):
    __tablename__ = "outbox"
    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    job_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("jobs.id", ondelete="CASCADE"))
    payload: Mapped[dict] = mapped_column(JSON)
    published: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

class Query(Base):
    __tablename__ = "queries"
    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    user_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"))
    document_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("documents.id", ondelete="CASCADE"))
    question: Mapped[str] = mapped_column(Text)
    answer: Mapped[str] = mapped_column(Text)
    citations: Mapped[list] = mapped_column(JSON)
    trust_score: Mapped[float] = mapped_column(Numeric(4, 3))
    latency_ms: Mapped[int] = mapped_column(Integer)
    model: Mapped[str] = mapped_column(String(64))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

class Feedback(Base):
    __tablename__ = "feedback"
    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    query_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("queries.id", ondelete="CASCADE"))
    rating: Mapped[int] = mapped_column(Integer)
    comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())