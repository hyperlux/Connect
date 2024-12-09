import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1E1E] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            className="mx-auto h-16 w-auto mb-8"
            src="/logodark.png"
            alt="Auroville"
          />
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-900/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-[#2A2A2A] p-8 rounded-xl">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#1E1E1E] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#1E1E1E] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-auroville-primary focus:ring-auroville-primary border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-auroville-primary hover:text-opacity-80">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <Link to="/" className="text-sm text-auroville-primary hover:text-opacity-80">
            ← Back to Welcome Page
          </Link>
          <p className="mt-4 text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-auroville-primary hover:text-opacity-80">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 