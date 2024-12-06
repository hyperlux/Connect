import { useForm } from 'react-hook-form';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-[#2a2a2a] p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-auroville-primary focus:ring-auroville-primary bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-auroville-primary focus:ring-auroville-primary bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 text-sm font-medium text-white bg-auroville-primary rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroville-primary disabled:opacity-50 dark:focus:ring-offset-gray-800 transition-colors"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Don't have an account?</span>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="ml-2 text-sm text-auroville-primary hover:text-opacity-90 focus:outline-none focus:underline transition-colors"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 