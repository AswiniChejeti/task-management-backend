# Task Management Backend API

This is a backend service for a Task Management System built with Node.js, Express, and MongoDB. It provides secure RESTful APIs for managing tasks with user authentication, pagination, and aggregation features.

---

## 🚀 Setup and Run Instructions

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/task-management-backend.git
cd task-management-backend
```

### 2. Install dependencies

```
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root folder:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_management_db
JWT_SECRET=your_secret_key

You can refer to `.env.example` for required environment variables.
```

### 4. Start MongoDB (Local)

```
mongod --dbpath "C:\data\db"
```

_(Skip this if using MongoDB Atlas)_

### 5. Run the server

```
npm run dev
```

👉 API will run at:
http://localhost:5000

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- express-validator
- dotenv

---

## 📑 API Endpoints

| Method | Endpoint            | Description                        | Auth |
| ------ | ------------------- | ---------------------------------- | ---- |
| POST   | /api/users/register | Register user                      | ❌   |
| POST   | /api/users/login    | Login user                         | ❌   |
| GET    | /api/tasks          | Get all tasks (pagination, filter) | ✅   |
| POST   | /api/tasks          | Create task                        | ✅   |
| GET    | /api/tasks/:id      | Get single task                    | ✅   |
| PUT    | /api/tasks/:id      | Update task                        | ✅   |
| DELETE | /api/tasks/:id      | Delete task                        | ✅   |
| GET    | /api/tasks/stats    | Task statistics (aggregation)      | ✅   |

---

## ✨ Features

- User authentication with JWT
- CRUD operations for tasks
- Pagination, filtering, and search
- MongoDB aggregation (task statistics)
- Input validation & error handling
- Clean architecture (MVC + service layer)

---

## 📁 Project Structure

```
config/
controllers/
models/
routes/
services/
middlewares/
utils/
server.js
```

---

## 🧠 Notes

- Use **Authorization: Bearer <token>** for protected routes
- MongoDB must be running (or use Atlas)
- All sensitive data handled via `.env`

## 🎯 Project Purpose

This project was built to demonstrate backend development skills including API design, authentication, data handling, and clean architecture.

---

## 🤖 AI Tool Usage Disclosure

As part of the development process for this application, the following AI tools were utilized:

**Tool Used:** Antigravity (AI Coding Assistant)
**Purpose:** Assisted with setting up backend architecture, debugging MongoDB connection issues, and configuring CORS and deployment environments.

## 🎓 AI Certification

I am currently enrolled in an AI certification program, which is in progress. The certification will be completed as part of my continuous learning and skill development.
