# Food Ordering Backend

## Requirements

- Python 3.7+
- MySQL

## Setup

### 1. Install [poetry](https://github.com/python-poetry/poetry)

#### Mac:
```bash
$ brew update
$ brew install poetry
$ poetry config virtualenvs.in-project true
```

#### Amazon Linux:
```bash
# install poetry:
$ curl -sSL https://install.python-poetry.org | python3.11 -

Add `export PATH="/home/ec2-user/.local/bin:$PATH"` to your shell configuration file.
$ poetry config virtualenvs.in-project true

$ sudo dnf install gcc cargo  # needed for bcrypt
```

### 2. Setup MySQL (for MacOS)
[Download MySQL Community Server Universal](https://dev.mysql.com/downloads/mysql/)  

Create a local database and user:
```bash
$ CREATE DATABASE food_ordering;
$ CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
$ GRANT ALL PRIVILEGES ON food_ordering.* TO 'user'@'localhost';
$ FLUSH PRIVILEGES;
$ USE food_ordering;
$ GRANT ALL PRIVILEGES ON food_ordering.* TO 'user'@'localhost';
$ FLUSH PRIVILEGES;
```

### 3. Repo Installation

```bash
$ git clone https://github.com/sumitbatwani/food_ordering.git
```

### 4. install the required packages
```bash
$ cd backend
$ poetry env use python3.11 
$ poetry install
```

### 6. Running
```shell
$ cd backend/
$ poetry shell
$ python start_server.py
```

### Project Core Package
1. [FastAPI](https://fastapi.tiangolo.com/)
2. [uvicorn](https://www.uvicorn.org/)
3. [SQLAlchemy](https://www.sqlalchemy.org/)


### Project Layout
```text
backend
├── poetry.lock
├── pyproject.toml
├── README.md
├── start_server.py
└── app
    ├── routers
    │   ├── cart.py
    │   ├── items.py
    │   ├── orders.py
    │   ├── users.py
    │   └── __init__.py
    ├── auth
    ├── crud
    ├── database
    ├── dependencies      
    ├── init_db
    ├── schemas
    ├── __init__
    └── main.py