from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, auth, dependencies
from typing import List, Union

router = APIRouter()

@router.get("/", response_model=List[schemas.OrderResponse])
def read_orders(current_user: schemas.UserResponse = Depends(auth.get_current_user), db: Session = Depends(dependencies.get_db)):
    orders = crud.get_orders(db, user_id=current_user.id)
    return orders

@router.post("/", response_model=Union[schemas.OrderResponse, schemas.OrderCreationErrorResponse])
def create_order(current_user: schemas.UserResponse = Depends(auth.get_current_user), db: Session = Depends(dependencies.get_db)):
    order = crud.create_order(db, user_id=current_user.id)
    if not order:
        raise HTTPException(status_code=400, detail="Order could not be created")
    return order
