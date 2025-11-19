import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authAPI.forgotPassword({ email });
      setSuccess(response.data.message);
      setResetToken(response.data.resetToken);
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Forgot Password
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="font-semibold">{success}</p>
            {resetToken && (
              <div className="mt-2">
                <p className="text-sm">Your reset token:</p>
                <code className="block mt-1 p-2 bg-white border border-green-300 rounded text-xs break-all">
                  {resetToken}
                </code>
                <p className="text-sm mt-2">
                  Use this token in the{' '}
                  <Link to="/reset-password" className="underline font-semibold">
                    Reset Password
                  </Link>{' '}
                  page.
                </p>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Request Reset Token'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link to="/login" className="block text-orange-500 hover:text-orange-600">
            Back to Login
          </Link>
          <Link
            to="/reset-password"
            className="block text-orange-500 hover:text-orange-600"
          >
            Already have a token? Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
