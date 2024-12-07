import { useForm } from 'react-hook-form';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default function SignupForm() {
  const { register: registerUser, error } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const registerData: RegisterData = {
        name: data.name,
        email: data.email,
        password: data.password
      };
      await registerUser(registerData);
      navigate('/verify-email');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-16 w-auto"
            src="/logolight.png"
            alt="Auroville"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h2>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                <div className="flex">
                  <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md border border-transparent bg-auroville-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="font-medium text-auroville-primary hover:text-opacity-90 focus:outline-none focus:underline transition-colors"
                    >
                      Sign in
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 