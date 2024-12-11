import { useForm } from 'react-hook-form';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../lib/api';

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
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, getValues } = useForm<SignupFormData>();

  const handleResendVerification = async (email: string) => {
    try {
      await api.post('/auth/resend-verification', { email });
      alert('Verification email has been resent. Please check your inbox and spam folder.');
    } catch (error: any) {
      console.error('Failed to resend verification:', error);
      alert('Failed to resend verification email. Please try again.');
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      const registerData: RegisterData = {
        name: data.name,
        email: data.email,
        password: data.password
      };
      await registerUser(registerData);
      navigate('/email-sent');
    } catch (error: any) {
      console.error('Signup failed:', error);
      if (error.response?.data?.message === 'Email already registered') {
        setRegistrationError('This email is already registered. Would you like to resend the verification email?');
      } else {
        setRegistrationError(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-16 w-auto"
            src="/logolight.png"
            alt="Auroville"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 transition-colors duration-200">
            Create your account
          </h2>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-800 transition-colors duration-200">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors duration-200">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors duration-200">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors duration-200">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors duration-200">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return "Passwords do not match";
                      }
                    }
                  })}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {registrationError && (
              <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/30 p-4 border border-yellow-200 dark:border-yellow-800">
                <div className="flex flex-col space-y-2">
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    {registrationError}
                  </div>
                  {registrationError.includes('already registered') && (
                    <button
                      type="button"
                      onClick={() => handleResendVerification(getValues('email'))}
                      className="text-sm text-yellow-700 dark:text-yellow-300 underline hover:text-yellow-600 dark:hover:text-yellow-200"
                    >
                      Resend verification email
                    </button>
                  )}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md border border-transparent bg-auroville-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:ring-offset-2 focus:ring-offset-[#1E1E1E] disabled:opacity-50 transition-all duration-200"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-medium text-auroville-primary hover:text-opacity-90 focus:outline-none focus:underline transition-colors duration-200"
                  >
                    Sign in
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 