# app/routers/cart.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, auth, database

router = APIRouter()

@router.get("/", response_model=schemas.CartResponse)
def read_cart(
    db: Session = Depends(database.get_session_local),
    current_user: schemas.UserResponse = Depends(auth.get_current_user)
):
    # cart_items = crud.get_cart_items(db, current_user.id)
    # return cart_items
    available_items, removed_items = crud.get_cart_items(db, user_id=current_user.id)
    return {"items": available_items, "removed_items": removed_items}
    

@router.post("/add/", response_model=schemas.CartItemResponse)
def add_to_cart(
    item_id: int,
    quantity: int,
    db: Session = Depends(database.get_session_local),
    current_user: schemas.UserResponse = Depends(auth.get_current_user)
):
    cart_item = crud.add_item_to_cart(db, current_user.id, item_id, quantity)
    return cart_item

@router.post("/remove/", response_model=dict)
def remove_from_cart(
    item_id: int,
    quantity: int,
    db: Session = Depends(database.get_session_local),
    current_user: schemas.UserResponse = Depends(auth.get_current_user)
):
    result = crud.remove_item_from_cart(db, current_user.id, item_id, quantity)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result
