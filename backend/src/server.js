require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const ChatMessage = require('./models/ChatMessage');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Full-Stack React Developer Assessment API',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword: 'POST /api/auth/reset-password',
      },
      tasks: {
        getAllTasks: 'GET /api/tasks',
        createTask: 'POST /api/tasks',
        updateTask: 'PUT /api/tasks/:id',
        deleteTask: 'DELETE /api/tasks/:id',
      },
      chat: {
        socketIO: 'Socket.io connection available for real-time chat',
      },
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join', async (username) => {
    socket.username = username;
    console.log(`${username} joined the chat`);

    try {
      const recentMessages = await ChatMessage.find()
        .sort({ timestamp: -1 })
        .limit(50)
        .lean();

      socket.emit('previousMessages', recentMessages.reverse());
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }

    io.emit('userJoined', {
      username,
      message: `${username} joined the chat`,
      timestamp: new Date(),
    });
  });

  socket.on('sendMessage', async (data) => {
    try {
      const chatMessage = await ChatMessage.create({
        username: data.username,
        message: data.message,
        timestamp: new Date(),
      });

      io.emit('message', {
        id: chatMessage._id,
        username: chatMessage.username,
        message: chatMessage.message,
        timestamp: chatMessage.timestamp,
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('userLeft', {
        username: socket.username,
        message: `${socket.username} left the chat`,
        timestamp: new Date(),
      });
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
