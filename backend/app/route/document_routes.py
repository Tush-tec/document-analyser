from fastapi import APIRouter
from controller import document_controller
from schemas import document

router = APIRouter(
    prefix="/contracts",
    tags=["contract"]
)


# Upload Contract
@router.post("/")
async def upload_document(request:document):
    return await document_controller.upload_contract(request)



