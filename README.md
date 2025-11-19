# Full-Stack React Developer Assessment

Complete full-stack application with React frontend, Express backend, MongoDB database, JWT authentication, and real-time Socket.io chat.

## 🎯 Assessment Tasks Completed

### ✅ Task 1 - Frontend (React Todo List)
- Add / Edit / Delete / Complete tasks
- Persist tasks using localStorage
- Clean, responsive UI with Tailwind CSS
- Uses useState and useEffect hooks

### ✅ Task 2 - Backend CRUD API
RESTful API endpoints for task management:
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- Ready for Postman testing

### ✅ Task 3 - Authentication System
Complete authentication with all endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

**Requirements:**
- ✓ Hashed passwords using bcrypt
- ✓ JWT-based sessions
- ✓ Email + password validation
- ✓ MongoDB for user storage

### ✅ Task 4 - Real-time Chat (Socket.io)
- Basic chat UI with attractive design
- Frontend & backend connected via Socket.io
- Real-time message delivery
- Timestamps for all messages
- MongoDB storage for chat history

---

## 📋 Prerequisites

Before running this project, make sure you have:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
3. **MongoDB Compass** (Optional but recommended) - [Download](https://www.mongodb.com/try/download/compass)
4. **Postman** (For API testing) - [Download](https://www.postman.com/downloads/)

---

## 🚀 Setup Instructions

### Step 1: Install MongoDB

1. Download and install MongoDB from the official website
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (using Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. Verify MongoDB is running:
   ```bash
   mongosh
   ```
   You should see MongoDB shell. Type `exit` to close.

### Step 2: Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. The `.env` file is already configured with:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fullstack-assessment
   JWT_SECRET=super-secret-jwt-key-for-development-only
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Frontend will run on `http://localhost:3000`

### Step 4: Access MongoDB Compass

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You'll see the `fullstack-assessment` database
4. View collections: `users`, `tasks`, `chatmessages`

---

## 🧪 Testing with Postman

### Import the following API endpoints:

#### 1. Authentication Endpoints

**Register User**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login User**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```
*Copy the `token` from response for authenticated requests*

**Forgot Password**
```
POST http://localhost:5000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```
*Copy the `resetToken` from response*

**Reset Password**
```
POST http://localhost:5000/api/auth/reset-password
Content-Type: application/json

{
  "resetToken": "YOUR_RESET_TOKEN_HERE",
  "newPassword": "newpassword123"
}
```

#### 2. Task CRUD Endpoints (Require Authentication)

**Get All Tasks**
```
GET http://localhost:5000/api/tasks
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Create Task**
```
POST http://localhost:5000/api/tasks
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "title": "Complete assessment",
  "description": "Finish all 4 tasks"
}
```

**Update Task**
```
PUT http://localhost:5000/api/tasks/TASK_ID_HERE
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true
}
```

**Delete Task**
```
DELETE http://localhost:5000/api/tasks/TASK_ID_HERE
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 🎨 Features Showcase

### Frontend Features
- **React Hooks**: useState, useEffect throughout the application
- **Context API**: AuthContext for global authentication state
- **React Router**: Client-side routing with protected routes
- **Tailwind CSS**: Modern, responsive UI with custom color schemes
- **LocalStorage**: Persistent todo list data
- **Socket.io Client**: Real-time chat integration

### Backend Features
- **Express.js**: RESTful API architecture
- **MongoDB + Mongoose**: Database with schema validation
- **JWT Authentication**: Secure token-based auth
- **Bcrypt**: Password hashing with salt rounds
- **Express Validator**: Input validation and sanitization
- **Socket.io**: WebSocket server for real-time chat
- **CORS**: Cross-origin resource sharing enabled

### Database Schema

**Users Collection**
```javascript
{
  name: String,
  email: String (unique, validated),
  password: String (hashed),
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date
}
```

**Tasks Collection**
```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

**ChatMessages Collection**
```javascript
{
  username: String,
  message: String,
  timestamp: Date,
  user: ObjectId (ref: User)
}
```

---

## 📁 Project Structure

```
fullstack-assessment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   └── taskController.js    # Task CRUD logic
│   │   ├── middleware/
│   │   │   └── auth.js              # JWT verification
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   ├── Task.js              # Task schema
│   │   │   └── ChatMessage.js       # Chat schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   └── taskRoutes.js        # Task endpoints
│   │   └── server.js                # Main server + Socket.io
│   ├── .env                         # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoList.jsx         # Task 1 - Todo component
│   │   │   └── Chat.jsx             # Task 4 - Chat component
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx      # Auth state management
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Task 3 - Login
│   │   │   ├── Register.jsx         # Task 3 - Register
│   │   │   ├── ForgotPassword.jsx   # Task 3 - Forgot password
│   │   │   └── ResetPassword.jsx    # Task 3 - Reset password
│   │   ├── services/
│   │   │   └── api.js               # API service + axios config
│   │   ├── App.jsx                  # Main app + routing
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Tailwind imports
│   ├── index.html
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   └── package.json
│
└── README.md                        # This file
```

---

## 🔒 Security Features

1. **Password Hashing**: Bcrypt with 10 salt rounds
2. **JWT Tokens**: Secure token generation with 7-day expiry
3. **Protected Routes**: Middleware authentication for task endpoints
4. **Input Validation**: Express-validator on all endpoints
5. **CORS**: Configured to allow frontend-backend communication
6. **Environment Variables**: Sensitive data in .env file

---

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/ (root endpoint)
- **MongoDB**: mongodb://localhost:27017
- **Database Name**: fullstack-assessment

---

## 📱 Frontend Pages

1. **Home** (`/`) - Dashboard with all features overview
2. **Todo List** (`/todo`) - Task 1 implementation
3. **Chat** (`/chat`) - Task 4 implementation
4. **Login** (`/login`) - Task 3 authentication
5. **Register** (`/register`) - Task 3 authentication
6. **Forgot Password** (`/forgot-password`) - Task 3 optional
7. **Reset Password** (`/reset-password`) - Task 3 optional

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB service is running
```bash
# Check MongoDB status
mongosh

# Start MongoDB if not running (see Step 1 above)
```

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution**: Change port in `backend/.env` file or kill the process using the port

### Frontend Can't Connect to Backend
**Solution**: Make sure backend is running on port 5000 and CORS is enabled

### JWT Token Issues
**Solution**: Make sure to include token in Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 💡 Demo Credentials

After running the app, you can:
1. Register a new user via `/register`
2. Or use Postman to create test users

---

## 🎓 Assessment Notes

This project demonstrates:
- ✅ Full-stack development skills (React + Express)
- ✅ Database design and management (MongoDB + Mongoose)
- ✅ RESTful API design principles
- ✅ Authentication and authorization (JWT + bcrypt)
- ✅ Real-time communication (Socket.io)
- ✅ Modern frontend development (Hooks, Context, Router)
- ✅ State management (Context API, localStorage)
- ✅ Responsive UI design (Tailwind CSS)
- ✅ Code organization and project structure
- ✅ Security best practices

---

## 📝 Notes for Interview

1. **MongoDB Compass**: Connect to `mongodb://localhost:27017` to view all data
2. **Postman Collection**: Import the endpoints listed above for API testing
3. **Socket.io**: Real-time chat works immediately when both users are connected
4. **LocalStorage**: Todo list persists even after browser refresh
5. **JWT Tokens**: Valid for 7 days, include in Authorization header for protected routes

---

## 📄 License

This project is created for assessment purposes.

---

## 👨‍💻 Developer

Full-Stack React Developer Assessment Project

**Happy Coding! 🚀**
