# Quick Setup Guide for Visual Studio Code

## ⚠️ Important Notice
This project **CANNOT run in Replit** because MongoDB is not available in the Replit environment. You need to run it on your local machine using Visual Studio Code.

## 🚀 Quick Start (5 Minutes)

### Step 1: Download the Project
1. Download all files from this Replit project
2. Extract to your local machine (e.g., `C:\Projects\fullstack-assessment`)

### Step 2: Install MongoDB
1. Download MongoDB: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Verify it's running on `localhost:27017`

### Step 3: Run Backend
```bash
cd backend
npm install
npm start
```
✅ Backend will run on http://localhost:5000

### Step 4: Run Frontend (Open New Terminal)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend will run on http://localhost:3000

### Step 5: Open MongoDB Compass
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. View database: `fullstack-assessment`

## ✅ You're Done!
- Open browser: http://localhost:3000
- Test API with Postman using the provided collection
- View data in MongoDB Compass

## 📝 Next Steps
1. Register a new user at http://localhost:3000/register
2. Try the Todo List at http://localhost:3000/todo
3. Test real-time Chat at http://localhost:3000/chat
4. Use Postman to test all API endpoints

## 🐛 Common Issues

**MongoDB not connecting?**
- Make sure MongoDB service is running
- Check connection string: `mongodb://localhost:27017`

**Port already in use?**
- Backend: Change PORT in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

**JWT token errors?**
- Login first to get token
- Add token to Postman Authorization header: `Bearer YOUR_TOKEN`

## 📚 Full Documentation
See `README.md` for complete documentation, API endpoints, and testing instructions.

---

**Happy Coding! 🚀**
