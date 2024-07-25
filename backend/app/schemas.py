from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# User
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

# Item
class ItemBase(BaseModel):
    name: str
    price: float
    stock: int
    image_url: str

class ItemCreate(ItemBase):
    category_id: int

class ItemResponse(ItemBase):
    id: int
    category_id: int
    category_name: Optional[str] = None

    class Config:
        orm_mode = True

# Item Category
class CategoryWithItemsResponse(BaseModel):
    id: int
    name: str
    items: List[ItemResponse]

    class Config:
        orm_mode = True

class CategoryBase(BaseModel):
    name: str
    description: str
    image_url: str

class CategoryResponse(CategoryBase):
    id: int
    items: List[ItemResponse] = []  # List of items, but with simplified ItemResponse

    class Config:
        orm_mode = True

# Cart
class CartItemBase(BaseModel):
    item_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemResponse(CartItemBase):
    id: int
    name: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None

    class Config:
        orm_mode = True

class CartResponse(BaseModel):
    items: List[CartItemResponse]
    removed_items: List[Dict[str, Any]] 

    class Config:
        orm_mode = True

# Order - Success
class OrderItemResponse(BaseModel):
    item_id: int
    quantity: int
    name: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[float] = None


    class Config:
        orm_mode = True

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_price: float
    timestamp: datetime
    is_delivered: bool
    order_items: List[OrderItemResponse]

    class Config:
        orm_mode = True

# Order - Failed (Removed Item)
class RemovedItemResponse(BaseModel):
    item_id: int
    name: str
    price: float
    quantity: int
    reason: str

class OrderCreationErrorResponse(BaseModel):
    status: str
    message: str
    removed_items: List[RemovedItemResponse]

# Token
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None
