from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import uuid
from config import ALLOWED_EXTENSION, MAX_FILE_MB, UPLOAD_DIR
from service.doc_parser import extract_text
from models import Contract

from database import contracts_collection

router = APIRouter(
    prefix="/contracts",
    tags=["contract"]
)


@router.post("/")
async def upload_contract(file : UploadFile = File(...)):
    """
    upload a PDF or TXT% contract for analysis
    """
    
    ext = os.path.splitext(file.filename)[1].lower()
     
    if ext not in ALLOWED_EXTENSION:
        raise  HTTPException(
            status_code=400,
            detail="Only .pdf and .txt are accepted"
        )
    
    content = await file.read()
    size_mb = len(content) / (1024 *  1024)
    
    if size_mb > MAX_FILE_MB : 
        raise HTTPException(
            status_code=400,
            detail="File size is too large upload. we accept file only 10mb"
        )

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    unique_name = f"{uuid.uuid4().hex}{ext}"
        
    file_path= os.path.join(UPLOAD_DIR, unique_name)
    
    with open(file_path, "wb") as f:
        f.write(content)
        
        
    parse = extract_text(file_path)
    print("PARSER RETURNED:", parse)
    
    if isinstance(parse, dict):
        text       = parse.get("text", "")
        page_count = parse.get("page_count", parse.get("pages", 0))
        word_count = parse.get("word_count", parse.get("words", len(text.split())))
    else:
        text       = parse or ""
        page_count = 0
        word_count = len(text.split())
    
    contract_data = Contract(
            filename = unique_name ,
            original_name  = file.filename,  
            text_content = parse["text"] if isinstance(parse, dict) else parse,
            page_count = page_count,
            word_count = word_count
    )
    
    doc = contract_data.model_dump()
    result = contracts_collection.insert_one(doc)
    doc.pop("_id", None)
    contract_data.id = str(result.inserted_id)
    return {
        "message": "File uploaded and processed successfully",
        "contract": contract_data.model_dump(),   # cleaner: dump from the model, not the raw doc
        "id": contract_data.id,
    }
    


