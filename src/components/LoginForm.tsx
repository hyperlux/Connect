import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../lib/theme';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login, error: authError, isAuthenticated, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [needsVerification, setNeedsVerification] = useState(false);
  const { 
    register, 
    handleSubmit: hookHandleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>();

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
    if (isAuthenticated() && user) {
      console.log('Auth state confirmed, navigating to dashboard...');
      // Use a timeout to ensure state is fully updated
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 0);
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await login(data);
    } catch (error) {
      if (error instanceof Error && error.message.includes('verify')) {
        setNeedsVerification(true);
      }
    }
  };

  return (
    <form onSubmit={hookHandleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <div className="mt-1">
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-auroville-primary focus:border-auroville-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="mt-1">
          <input
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            type="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-auroville-primary focus:border-auroville-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
      </div>

      {authError && !needsVerification && (
        <div className="text-sm text-red-600">
          {authError}
        </div>
      )}

      {needsVerification && (
        <div className="text-sm text-yellow-600">
          Please check your email to verify your account before logging in.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-auroville-primary hover:bg-auroville-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroville-primary disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
} 