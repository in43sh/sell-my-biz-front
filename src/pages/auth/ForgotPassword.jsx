import { useState } from 'react';
import { requestPasswordReset } from '../../api/DBRequests';
import InputField from '../../components/form/InputField';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      setLoading(true);
      await requestPasswordReset(email);
      setMessage('If this email is registered, a reset link has been sent.');
    } catch (err) {
      setError('Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">Forgot Password</h2>

        {message && (
          <p className="mb-3 rounded-md bg-green-100 p-2 text-green-600">
            {message}
          </p>
        )}
        {error && (
          <p className="mb-3 rounded-md bg-red-100 p-2 text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
