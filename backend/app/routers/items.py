from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, dependencies, database

router = APIRouter()

@router.get("/", response_model=List[schemas.ItemResponse])
def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(dependencies.get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

@router.get("/{category_id}", response_model=schemas.CategoryWithItemsResponse)
def read_items_by_category(category_id: int, db: Session = Depends(dependencies.get_db)):
    items_with_category = crud.get_items_by_category(db, category_id=category_id)
    if not items_with_category:
        return {"id": category_id, "name": None, "items": []}

    category_name = items_with_category[0][1] if items_with_category else None
    items = [
        schemas.ItemResponse(
            id=item.id,
            name=item.name,
            price=item.price,
            stock=item.stock,
            image_url=item.image_url,
            category_id=item.category_id
        )
        for item, _ in items_with_category
    ]
    return schemas.CategoryWithItemsResponse(
        id=category_id,
        name=category_name,
        items=items
    )

@router.post("/", response_model=schemas.ItemResponse)
def create_item(item: schemas.ItemCreate, db: Session = Depends(dependencies.get_db)):
    return crud.create_item(db=db, item=item)

@router.get("/categories/", response_model=List[schemas.CategoryResponse])
def read_categories(db: Session = Depends(dependencies.get_db)):
    categories = crud.get_categories(db)
    return categories

@router.get("/search/", response_model=List[schemas.ItemResponse])
def search_items(
    query: str,
    db: Session = Depends(database.get_session_local)
):
    items = crud.search_items(db, query)
    return items
