from sqlalchemy.orm import Session
from . import models, schemas, crud
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User CRUD
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Item CRUD
def get_categories(db: Session):
    return db.query(models.Category).all()

def get_items(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Item).offset(skip).limit(limit).all()

# def get_items_by_category(db: Session, category_id: int):
#     return db.query(models.Item).filter(models.Item.category_id == category_id).all()

def get_items_by_category(db: Session, category_id: int):
    return (
        db.query(models.Item, models.Category.name)
        .join(models.Category, models.Item.category_id == models.Category.id)
        .filter(models.Item.category_id == category_id)
        .all()
    )

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# Cart CRUD
def add_item_to_cart(db: Session, user_id: int, item_id: int, quantity: int):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        cart = models.Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    
    cart_item = db.query(models.CartItem).filter(
        models.CartItem.cart_id == cart.id,
        models.CartItem.item_id == item_id
    ).first()
    
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = models.CartItem(cart_id=cart.id, item_id=item_id, quantity=quantity)
        db.add(cart_item)
    
    db.commit()
    db.refresh(cart_item)
    return cart_item

def remove_item_from_cart(db: Session, user_id: int, item_id: int, quantity: int):
    # Fetch the cart for the user
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    
    if not cart:
        print(f"Cart not found for user_id: {user_id}")
        return {"error": "Cart not found"}

    # Fetch the item in the cart
    cart_item = db.query(models.CartItem).filter(
        models.CartItem.cart_id == cart.id,
        models.CartItem.item_id == item_id
    ).first()
    
    if not cart_item:
        print(f"CartItem not found for item_id: {item_id} in cart_id: {cart.id}")
        return {"error": "Item not found in cart"}
    
    if cart_item.quantity > quantity:
        # Reduce the quantity if more than the required quantity is present
        cart_item.quantity -= quantity
        db.commit()
        print(f"Item quantity reduced: {cart_item.quantity}")
        return {"message": "Item quantity reduced in cart"}
    else:
        # Remove the item if the quantity is less than or equal to the required quantity
        db.delete(cart_item)
        db.commit()
        print(f"Item removed from cart: item_id {item_id}")
        return {"message": "Item removed from cart"}


def get_cart_items(db: Session, user_id: int, remove_unavailable: bool = True):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        return [], []

    cart_items = db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id).all()
    available_cart_items = []
    removed_cart_items = []

    for cart_item in cart_items:
        item = db.query(models.Item).filter(models.Item.id == cart_item.item_id).first()
        if item and item.stock >= cart_item.quantity:
            available_cart_items.append({
                "id": cart_item.id,
                "item_id": item.id,
                "name": item.name,
                "price": item.price,
                "image_url": item.image_url,
                "stock": item.stock,
                "quantity": cart_item.quantity
            })
        else:
            removed_cart_items.append({
                "id": cart_item.id,
                "item_id": cart_item.item_id,
                "name": item.name,
                "price": item.price,
                "image_url": item.image_url,
                "quantity": cart_item.quantity,
                "stock": item.stock,
                "reason": "Unavailable" if not item else "Insufficient stock"
            })
            if remove_unavailable:
                db.delete(cart_item)  # Remove unavailable item from cart
                db.commit()

    return available_cart_items, removed_cart_items

    

# Order CRUD
def create_order(db: Session, user_id: int):
    available_items, removed_items = crud.get_cart_items(db, user_id, False)

    if removed_items:
        return schemas.OrderCreationErrorResponse(
            status="error",
            message="Some items were removed due to unavailability",
            removed_items=removed_items
        )

    if not available_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total_price = sum(item['quantity'] * item['price'] for item in available_items)

    db_order = models.Order(user_id=user_id, total_price=total_price)
    db.add(db_order)
    db.commit()

    for item in available_items:
        db_order_item = models.OrderItem(
            order_id=db_order.id,
            item_id=item['item_id'],
            quantity=item['quantity']
        )
        db.add(db_order_item)

        db_cart_item = db.query(models.CartItem).filter(
            models.CartItem.item_id == item['item_id'],
            models.CartItem.cart.has(user_id=user_id)
        ).first()
        
        if db_cart_item:
            db.delete(db_cart_item)

    db.commit()
    db.refresh(db_order)

    return schemas.OrderResponse(
        id=db_order.id,
        user_id=db_order.user_id,
        total_price=db_order.total_price,
        timestamp=db_order.timestamp,
        is_delivered=db_order.is_delivered,
        order_items=[{"item_id": item['item_id'], "quantity": item['quantity']} for item in available_items]
    )

def get_orders(db: Session, user_id: int):
    # Query for orders
    orders = (
        db.query(models.Order)
        .filter(models.Order.user_id == user_id)
        .all()
    )

    order_responses = []
    for order in orders:
        # Join OrderItem with Item to fetch details
        order_items = (
            db.query(models.OrderItem, models.Item)
            .join(models.Item, models.OrderItem.item_id == models.Item.id)
            .filter(models.OrderItem.order_id == order.id)
            .all()
        )

        # Construct responses
        order_item_responses = [
            schemas.OrderItemResponse(
                item_id=order_item[0].item_id,  # OrderItem
                quantity=order_item[0].quantity,  # OrderItem
                name=order_item[1].name,  # Item
                image_url=order_item[1].image_url,  # Item
                price=order_item[1].price  # Item
            )
            for order_item in order_items
        ]

        order_response = schemas.OrderResponse(
            id=order.id,
            user_id=order.user_id,
            total_price=order.total_price,
            timestamp=order.timestamp,
            is_delivered=order.is_delivered,
            order_items=order_item_responses
        )
        order_responses.append(order_response)

    return order_responses


def search_items(db: Session, query: str):
    # Search for items by category name
    category_items = db.query(
        models.Item.id,
        models.Item.name,
        models.Item.price,
        models.Item.stock,
        models.Item.image_url,
        models.Item.category_id,
        models.Category.name.label('category_name')
    ).join(models.Category).filter(
        models.Category.name.ilike(f"%{query}%")
    ).all()

    # Search for items by item name
    item_name_items = db.query(
        models.Item.id,
        models.Item.name,
        models.Item.price,
        models.Item.stock,
        models.Item.image_url,
        models.Item.category_id,
        models.Category.name.label('category_name')
    ).join(models.Category).filter(
        models.Item.name.ilike(f"%{query}%")
    ).all()

    # Combine results and remove duplicates
    all_items = list({item.id: item for item in category_items + item_name_items}.values())
    
    return all_items
