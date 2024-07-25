from fastapi import FastAPI
from .init_db import init_db
from .routers import users, items, orders, cart
from .database import engine, Base
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,  # Indicate that cookies should be supported
        allow_methods=['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],  # not OPTIONS or HEAD
        allow_headers=['*'],  # HTTP request headers that should be supported
        
)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(items.router, prefix="/items", tags=["items"])
app.include_router(orders.router, prefix="/orders", tags=["orders"])
app.include_router(cart.router, prefix="/cart", tags=["cart"])

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

init_db()
