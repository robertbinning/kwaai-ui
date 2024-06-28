from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal  # Correct import
from models import User  # Only import User from models
from typing import List  # Import List from typing
import logging

app = FastAPI()

origins = [
    "http://localhost:5173",  # Add your frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class UserCreate(BaseModel):
    email: str
    user_type: str

class LoginRequest(BaseModel):
    email: str

class UserResponse(BaseModel):
    id: int
    email: str
    user_type: str

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(email=user.email, user_type=user.user_type)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    logger.info(f"User registered: {new_user.email}")
    return {"message": "User registered successfully", "user": new_user}

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    logger.info(f"Login attempt for email: {request.email}")
    db_user = db.query(User).filter(User.email == request.email).first()
    if db_user:
        logger.info(f"Login successful for email: {request.email}")
        return {"message": "Login successful", "user_type": db_user.user_type}
    else:
        logger.warning(f"User not found for email: {request.email}")
        raise HTTPException(status_code=404, detail="User not found")

@app.get("/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users
