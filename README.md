# Expense Tracker API (Backend-First)

A backend-focused Expense Tracker application that provides a RESTful API for managing personal expenses.  
This project is built to strengthen backend fundamentals, database design skills, and API development practices.

---

## Project Goals

- Practice **backend API design** using Node.js
- Apply **relational database concepts** (schema design, constraints, queries)
- Build a foundation that can later support a frontend client

This project follows the idea from  
[roadmap.sh – Expense Tracker](https://roadmap.sh/projects/expense-tracker)  
but is implemented with a **backend-first approach**.
---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes for user data

### Expense Management
- Create, read, update, delete expenses
- Each expense includes:
  - Amount
  - Category
  - Description
  - Date
- Expenses are scoped per user

### Filtering & Queries
- Filter expenses by:
  - Date range
  - Category
- Basic pagination for large datasets

---

## Tech Stack

| Layer | Technology |
|------|-----------|
| Runtime | Node.js |
| Backend Framework | Express |
| Language | JavaScript (TypeScript planned) |
| Database | PostgreSQL |
| Authentication | JSON Web Tokens (JWT) |
| API Testing | Postman |
| Version Control | Git |

---

## Project Structure
backend/   
├─ src/  
│ ├─ controllers/  
│ ├─ routes/  
│ ├─ services/  
│ ├─ middlewares/  
│ ├─ models/  
│ └─ app.js  
├─ .env  
├─ .env.example  
└─ package.json  


---

## Database Design (Overview)

Core tables:
- `users`
  - id (PK)
  - email 
  - password_hash
  - created_at 
- `categories`
  - id (PK)
  - name 
- `expenses`
  - id (PK)
  - user_id
  - category_id
  - amount
  - description
  - expense_date
  - created_at 

Key concepts applied:
- Primary keys (PK)
- Foreign key relationships (FK)
- NOT NULL and CHECK constraints
- Indexed columns for query performance

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |

### Expenses
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/expenses` | Get all expenses for logged-in user |
| POST | `/expenses` | Create a new expense |
| PUT | `/expenses/:id` | Update an expense |
| DELETE | `/expenses/:id` | Delete an expense |

---

## Environment Variables

Create a `.env` file based on `.env.example`:  
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/expense_tracker
JWT_SECRET=your_jwt_secret

---

## Setup & Run

### Backend

```bash
cd backend
npm install
npm run dev
The API will be available at:
http://localhost:3000
