import { useForm } from 'react-hook-form';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../lib/theme';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login, error, isAuthenticated, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [needsVerification, setNeedsVerification] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm<LoginFormData>();

  // Check system dark mode preference on mount
  useEffect(() => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial theme based on system preference
    if (darkModePreference.matches && theme !== 'dark') {
      setTheme('dark');
    }

    // Listen for system theme changes
    darkModePreference.addEventListener('change', handleChange);
    return () => darkModePreference.removeEventListener('change', handleChange);
  }, [setTheme, theme]);

  // Watch for auth state changes
  useEffect(() => {
    console.log('LoginForm auth state:', { isAuthenticated, user });
    if (isAuthenticated && user) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    console.log('Attempting login...');
    try {
      await login(data.email, data.password);
      console.log('Login successful, waiting for state update...');
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.response?.data?.needsVerification) {
        setNeedsVerification(true);
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const email = getValues('email');
      await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      alert('Verification email has been resent. Please check your inbox.');
    } catch (error) {
      console.error('Failed to resend verification:', error);
      alert('Failed to resend verification email. Please try again.');
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white dark:bg-[#1e1e1e] py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', { required: 'Email is required' })}
                className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password', { required: 'Password is required' })}
                className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>
          </div>

          {error && !needsVerification && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <div className="flex">
                <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
              </div>
            </div>
          )}

          {needsVerification && (
            <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4">
              <div className="flex flex-col space-y-2">
                <div className="text-sm text-yellow-700 dark:text-yellow-400">
                  Please verify your email before logging in.
                </div>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="text-sm text-yellow-700 dark:text-yellow-400 underline hover:text-yellow-600"
                >
                  Resend verification email
                </button>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md border border-transparent bg-auroville-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="font-medium text-auroville-primary hover:text-opacity-90 focus:outline-none focus:underline transition-colors"
                >
                  Sign up
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 