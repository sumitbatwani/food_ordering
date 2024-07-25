import random
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from .models import Item, Category

cdn = "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11"
categories_data = {
    "Fruits & Vegetable": {
        "items": ["Apple", "Banana", "Orange", "Grapes", "Mango", "Pineapple", "Strawberry", "Carrot", "Broccoli", "Spinach", "Potato", "Onion", "Tomato", "Cucumber"],
        "image_url": f"{cdn}/Slice-3_9.png"
    },
    "Snacks & Munchies": {
        "items": ["Chips"],
        "image_url": f"{cdn}/Slice-5_4.png"
    },
    "Medical": {
        "items": ["Painkiller", "Antibiotic", "Bandage", "Cough Syrup", "Antiseptic", "Vitamins", "First Aid Kit"],
        "image_url": f"{cdn}/Slice-16.png"
    },
    "General": {
        "items": ["Umbrella", "Water Bottle", "Torch", "Sunglasses", "Phone Charger", "Headphones", "Wallet"],
        "image_url": f"{cdn}/Slice-10.png"
    },
    "Dairy": {
        "items": ["Milk", "Cheese", "Butter", "Yogurt", "Cream", "Ice Cream", "Ghee"],
        "image_url": f"{cdn}/Slice-2_10.png"
    },
    "Bakery": {
        "items": ["Bread", "Croissant", "Cake", "Donut", "Pastry", "Muffin", "Bagel"],
        "image_url": f"{cdn}/Slice-8_4.png"
    }
}

def generate_dummy_items(category_ids):
    items = []
    for _ in range(50):
        category_name = random.choice(list(categories_data.keys()))
        item_name = random.choice(categories_data[category_name]['items'])
        category_id = category_ids[category_name]
        item = Item(
            name=item_name,
            category_id=category_id,
            price=round(random.uniform(1.0, 50.0), 2),
            stock=random.randint(0, 100),
            image_url=f"{cdn}/Slice-8_4.png"
        )
        items.append(item)
    return items

def init_db():
    db: Session = SessionLocal()

    # Check if the categories table is empty
    if not db.query(Category).first():
        category_objects = [
            Category(name=name, description=f"{name} items", image_url=data['image_url'])
            for name, data in categories_data.items()
        ]
        db.bulk_save_objects(category_objects)
        db.commit()

    # Fetch the created categories to get their IDs
    category_ids = {category.name: category.id for category in db.query(Category).all()}

    # Check if the items table is empty
    if not db.query(Item).first():
        items = generate_dummy_items(category_ids)
        db.bulk_save_objects(items)
        db.commit()
