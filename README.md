# Task Management System Backend

A production-ready REST API for a Task Management System built with Node.js, Express.js, and MongoDB.

## Features

✅ **CRUD Operations** - Full task management with Create, Read, Update, Delete operations  
✅ **User Authentication** - JWT-based authentication with registration and login  
✅ **Pagination & Filtering** - Get tasks with pagination, filtering by status/priority, and search  
✅ **Aggregation Pipeline** - View task statistics (total tasks, by status, by priority)  
✅ **Input Validation** - Comprehensive validation using express-validator  
✅ **Error Handling** - Centralized error handling with proper HTTP status codes  
✅ **Clean Architecture** - Organized folder structure with separation of concerns  
✅ **Security** - Password hashing with bcryptjs, JWT token-based authentication

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv

---

## Project Structure

```
task-management-system/
├── config/
│   └── database.js           # MongoDB connection configuration
├── controllers/
│   ├── taskController.js     # Task request handlers
│   └── userController.js     # User request handlers
├── models/
│   ├── Task.js              # Task schema and model
│   └── User.js              # User schema and model
├── routes/
│   ├── taskRoutes.js        # Task API routes
│   └── userRoutes.js        # User API routes
├── services/
│   ├── taskService.js       # Task business logic
│   └── userService.js       # User business logic
├── middlewares/
│   ├── auth.js              # JWT authentication middleware
│   ├── validation.js        # Input validation middleware
│   └── errorHandler.js      # Centralized error handling
├── utils/
│   └── helpers.js           # Utility functions
├── server.js                # Main application file
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
└── package.json            # Project dependencies
```

---

## Installation

### Prerequisites

- Node.js v14 or higher
- MongoDB running locally or connection string to MongoDB Atlas

### Steps

1. **Clone the repository** (or use the existing directory)

   ```bash
   cd "d:/Task Management System"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create/edit `.env` file:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ```

4. **Start the server**

   ```bash
   npm start          # Production
   npm run dev        # Development (with auto-reload)
   ```

5. **Verify server is running**
   ```bash
   curl http://localhost:5000/api/health
   ```

---

## API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User

```
POST /users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login User

```
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Get User Profile

```
GET /users/profile
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-04-17T10:00:00.000Z"
  }
}
```

---

### Task Endpoints (All require authentication)

#### 4. Create Task

```
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project report",
  "description": "Finish writing the quarterly report",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-05-01"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "title": "Complete project report",
    "description": "Finish writing the quarterly report",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-05-01T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-04-17T10:00:00.000Z",
    "updatedAt": "2024-04-17T10:00:00.000Z"
  }
}
```

#### 5. Get All Tasks (with Pagination & Filtering)

```
GET /tasks?page=1&limit=10&status=pending&priority=high&search=report
Authorization: Bearer <token>
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (pending, in-progress, completed)
- `priority` (optional): Filter by priority (low, medium, high)
- `search` (optional): Search in title and description

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "Complete project report",
      "description": "Finish writing the quarterly report",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-05-01T00:00:00.000Z",
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-04-17T10:00:00.000Z",
      "updatedAt": "2024-04-17T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalTasks": 25,
    "totalPages": 3
  }
}
```

#### 6. Get Single Task

```
GET /tasks/:id
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "title": "Complete project report",
    "description": "Finish writing the quarterly report",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-05-01T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-04-17T10:00:00.000Z",
    "updatedAt": "2024-04-17T10:00:00.000Z"
  }
}
```

#### 7. Update Task

```
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress",
  "priority": "medium"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "title": "Complete project report",
    "description": "Finish writing the quarterly report",
    "status": "in-progress",
    "priority": "medium",
    "dueDate": "2024-05-01T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-04-17T10:00:00.000Z",
    "updatedAt": "2024-04-17T10:02:30.000Z"
  }
}
```

#### 8. Delete Task

```
DELETE /tasks/:id
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": null
}
```

#### 9. Get Task Statistics

```
GET /tasks/stats
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Task statistics retrieved successfully",
  "data": {
    "totalTasks": 25,
    "byStatus": [
      { "_id": "pending", "count": 10 },
      { "_id": "in-progress", "count": 8 },
      { "_id": "completed", "count": 7 }
    ],
    "byPriority": [
      { "_id": "low", "count": 5 },
      { "_id": "medium", "count": 12 },
      { "_id": "high", "count": 8 }
    ]
  }
}
```

---

## Error Handling

The API returns appropriate HTTP status codes and error messages:

```json
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

**Common Status Codes:**

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Validation errors or invalid request
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Data Models

### User Model

```javascript
{
  username: String (required, unique, min 3 chars),
  email: String (required, unique),
  password: String (required, hashed, min 6 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  status: Enum ['pending', 'in-progress', 'completed'],
  priority: Enum ['low', 'medium', 'high'],
  dueDate: Date (optional),
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Validation Rules

### Task Validation

- **title**: Required, max 100 characters
- **description**: Optional, max 500 characters
- **status**: Must be 'pending', 'in-progress', or 'completed'
- **priority**: Must be 'low', 'medium', or 'high'
- **dueDate**: Optional, must be valid ISO 8601 date

### User Validation

- **username**: Required, min 3 characters, unique
- **email**: Required, valid email format, unique
- **password**: Required, min 6 characters (hashed before storage)

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register** to get a token
2. **Include the token** in the `Authorization` header:
   ```
   Authorization: Bearer <your_token_here>
   ```
3. **Token expires** after the duration specified in `.env` (default: 7 days)

---

## Development

### Running in development mode with auto-reload:

```bash
npm run dev
```

### Available npm scripts:

- `npm start` - Start the server in production mode
- `npm run dev` - Start with nodemon (auto-reload on file changes)

---

## Environment Variables

| Variable      | Description                          | Default                                             |
| ------------- | ------------------------------------ | --------------------------------------------------- |
| `PORT`        | Server port                          | 5000                                                |
| `NODE_ENV`    | Environment (development/production) | development                                         |
| `MONGODB_URI` | MongoDB connection string            | mongodb://localhost:27017/task-management           |
| `JWT_SECRET`  | Secret key for JWT signing           | your_super_secret_jwt_key_change_this_in_production |
| `JWT_EXPIRE`  | Token expiration time                | 7d                                                  |

---

## Best Practices Implemented

✅ **Async/Await** - Modern JavaScript async patterns  
✅ **Error Handling** - Centralized error middleware  
✅ **Validation** - Input validation at middleware level  
✅ **Security** - Password hashing, JWT authentication, CORS enabled  
✅ **Scalability** - Service layer for business logic separation  
✅ **Clean Code** - Modular structure, single responsibility principle  
✅ **Documentation** - Comprehensive API documentation  
✅ **Database Indexes** - Optimized MongoDB queries

---

## Testing the API

### Using cURL:

**1. Register a user:**

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**2. Login:**

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**3. Create a task (replace TOKEN with actual token):**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "This is a test task",
    "priority": "high",
    "status": "pending"
  }'
```

### Using Postman:

1. Import the API endpoints into Postman
2. Set the `Authorization` header with Bearer token after login
3. Test each endpoint with sample data

---

## Production Deployment

### Before deploying:

1. Change `JWT_SECRET` to a strong, unique value
2. Set `NODE_ENV=production`
3. Use a remote MongoDB instance (e.g., MongoDB Atlas)
4. Ensure MongoDB is accessible from your server
5. Consider adding HTTPS, rate limiting, and additional security measures

### Deployment platforms:

- Heroku
- AWS EC2
- DigitalOcean
- Render.com
- Railway

---

## License

ISC

---

## Support

For issues or questions, please refer to the code documentation or contact the development team.
