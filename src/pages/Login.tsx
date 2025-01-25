import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();

  // Add detailed logging for authentication state
  useEffect(() => {
    console.log('Login Component Mount - Auth State:', {
      isAuthenticated: isAuthenticated(),
      user: user ? { id: user.id, email: user.email } : null,
      locationState: location.state
    });
  }, [isAuthenticated, user, location.state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    console.log('Login Attempt:', {
      email,
      timestamp: new Date().toISOString()
    });

    try {
      // Log before login attempt
      console.log('Attempting login with credentials');
      
      const loginResponse = await login({ email, password });
      
      console.log('Login Response:', {
        success: true,
        userReturned: !!loginResponse.user,
        tokenReceived: !!loginResponse.token
      });

      // Verify authentication state immediately after login
      console.log('Post-Login Auth Check:', {
        isAuthenticated: isAuthenticated(),
        user: user ? { id: user.id, email: user.email } : null
      });
      
      // Get the redirect path from location state or default to dashboard
      const from = location.state?.from?.pathname || '/app/dashboard';
      
      console.log('Navigating to:', from);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login Error:', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Login failed'
      });

      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/logodark.png"
            alt="Auroville"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-auroville-primary focus:border-auroville-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-auroville-primary focus:border-auroville-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-auroville-primary hover:text-auroville-secondary"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-auroville-primary hover:bg-auroville-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroville-primary ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-auroville-primary hover:text-auroville-secondary"
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
