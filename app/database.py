from pymongo import MongoClient
from config import MONGODB_URI


client = MongoClient(MONGODB_URI)
db = client.get_database()


# Collections
contracts_collection = db["contract"]
analysis_collection = db["analysis"]



def init_db():
    # Create indexed for the collection if theyu don't exist
    
    contracts_collection.create_index("filename", unique=True)
    analysis_collection.create_index("contract_id")
