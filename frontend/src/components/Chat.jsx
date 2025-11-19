import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('previousMessages', (prevMessages) => {
      setMessages(prevMessages);
    });

    newSocket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('userJoined', (data) => {
      setMessages((prev) => [
        ...prev,
        { ...data, type: 'system', id: Date.now() },
      ]);
    });

    newSocket.on('userLeft', (data) => {
      setMessages((prev) => [
        ...prev,
        { ...data, type: 'system', id: Date.now() },
      ]);
    });

    return () => newSocket.close();
  }, []);

  const joinChat = (e) => {
    e.preventDefault();
    if (username.trim() && socket) {
      socket.emit('join', username);
      setIsJoined(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit('sendMessage', {
        username,
        message: newMessage,
      });
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            💬 Join Chat
          </h2>
          <form onSubmit={joinChat}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)]">
        <div className="bg-white rounded-2xl shadow-xl h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800">💬 Real-Time Chat</h1>
            <p className="text-gray-600 mt-1">Logged in as: {username}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
            {messages.map((msg, index) => (
              <div key={msg.id || index}>
                {msg.type === 'system' ? (
                  <div className="text-center">
                    <span className="inline-block px-4 py-2 bg-gray-200 text-gray-600 rounded-full text-sm">
                      {msg.message}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`flex ${
                      msg.username === username ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md ${
                        msg.username === username
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      } rounded-2xl px-4 py-3 shadow`}
                    >
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {msg.username}
                        </span>
                        <span
                          className={`text-xs ${
                            msg.username === username
                              ? 'text-indigo-200'
                              : 'text-gray-500'
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <p className="break-words">{msg.message}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="p-6 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
