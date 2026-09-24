from  fastapi import FastAPI
from database import init_db
from route.contract_route import router  as contracts_router 

async def lifespan(app:FastAPI):
    await init_db()
    print("Database connect")
    yield
    print("Shutting down the app")


app = FastAPI(
    title ="Vakeel Contract API",
    description = "AI Powered Contract Analysis."
)


app.include_router(contracts_router)
app.include_router(auth.router,       prefix="/api/v1/auth",       tags=["auth"])
app.include_router(documents.router,  prefix="/api/v1/documents",  tags=["documents"])
app.include_router(jobs.router,       prefix="/api/v1/jobs",       tags=["jobs"])
app.include_router(query.router,      prefix="/api/v1",            tags=["query"])
app.include_router(feedback.router,   prefix="/api/v1/feedback",   tags=["feedback"])


@app.get('/')
def root():
    return {
        "app" : "Vakeel contract api",
        "versoin" :"1.0.0",
    }


