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


@app.get('/')
def root():
    return {
        "app" : "Vakeel contract api",
        "versoin" :"1.0.0",
    }


