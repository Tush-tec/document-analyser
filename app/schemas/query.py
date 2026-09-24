from pydantic import BaseModel, Field

class Citation(BaseModel):
    chunk_id: str
    page: int
    quote: str

class QueryIn(BaseModel):
    question: str = Field(min_length=1, max_length=500)

class QueryOut(BaseModel):
    query_id: str
    answer: str
    citations: list[Citation]
    trust_score: float
    confidence: str