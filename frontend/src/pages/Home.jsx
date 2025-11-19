import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Full-Stack Assessment
          </h1>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user.name}!</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Full-Stack React Developer Assessment
          </h2>
          <p className="text-xl text-gray-600">
            Complete assessment with all required features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/todo"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Todo List</h3>
            <p className="text-gray-600">
              Task 1: Add, Edit, Delete & Complete tasks with localStorage
              persistence
            </p>
          </Link>

          <Link
            to="/chat"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Real-Time Chat
            </h3>
            <p className="text-gray-600">
              Task 4: Socket.io chat with timestamps and MongoDB storage
            </p>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Authentication
            </h3>
            <p className="text-gray-600 mb-4">
              Task 3: JWT-based auth with hashed passwords
            </p>
            <div className="space-y-2">
              <Link
                to="/login"
                className="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-center"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">🔧</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Backend API
            </h3>
            <p className="text-gray-600 mb-4">
              Task 2: RESTful CRUD endpoints for tasks
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>✓ GET /api/tasks</p>
              <p>✓ POST /api/tasks</p>
              <p>✓ PUT /api/tasks/:id</p>
              <p>✓ DELETE /api/tasks/:id</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">🗄️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              MongoDB Database
            </h3>
            <p className="text-gray-600">
              All data stored in MongoDB - view with MongoDB Compass at
              localhost:27017
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">📮</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Postman Ready
            </h3>
            <p className="text-gray-600">
              All API endpoints documented and ready for Postman testing
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            ✅ Assessment Checklist
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Task 1 - Frontend Todo</h4>
              <ul className="space-y-1 text-gray-600">
                <li>✓ Add tasks</li>
                <li>✓ Edit tasks</li>
                <li>✓ Delete tasks</li>
                <li>✓ Complete tasks</li>
                <li>✓ localStorage persistence</li>
                <li>✓ useState & useEffect</li>
                <li>✓ Clean, responsive UI</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Task 2 - Backend CRUD</h4>
              <ul className="space-y-1 text-gray-600">
                <li>✓ GET /tasks</li>
                <li>✓ POST /tasks</li>
                <li>✓ PUT /tasks/:id</li>
                <li>✓ DELETE /tasks/:id</li>
                <li>✓ Postman ready</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Task 3 - Authentication</h4>
              <ul className="space-y-1 text-gray-600">
                <li>✓ POST /auth/register</li>
                <li>✓ POST /auth/login</li>
                <li>✓ POST /auth/forgot-password</li>
                <li>✓ POST /auth/reset-password</li>
                <li>✓ Hashed passwords (bcrypt)</li>
                <li>✓ JWT sessions</li>
                <li>✓ Email & password validation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Task 4 - Real-time Chat</h4>
              <ul className="space-y-1 text-gray-600">
                <li>✓ Socket.io integration</li>
                <li>✓ Real-time messages</li>
                <li>✓ Timestamps</li>
                <li>✓ MongoDB storage</li>
                <li>✓ Attractive chat UI</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
