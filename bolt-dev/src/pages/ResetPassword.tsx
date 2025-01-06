import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>();
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setStatus('idle');
      setErrorMessage('');
      
      const token = searchParams.get('token');
      if (!token) {
        setStatus('error');
        setErrorMessage('Invalid reset link');
        return;
      }

      await api.post('/auth/reset-password', {
        token,
        newPassword: data.newPassword
      });
      
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Failed to reset password');
    }
  };

  const password = watch('newPassword');

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
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          {status === 'success' ? (
            <div className="text-center">
              <div className="text-green-600 dark:text-green-400 mb-4">
                Your password has been reset successfully.
              </div>
              <button
                onClick={() => navigate('/login')}
                className="text-auroville-primary hover:text-opacity-90"
              >
                Return to login
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900 dark:text-white">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="newPassword"
                    type="password"
                    {...register('newPassword', { 
                      required: 'New password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
                    placeholder="Enter new password"
                  />
                  {errors.newPassword && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.newPassword.message}</p>
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
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-auroville-primary focus:outline-none focus:ring-auroville-primary sm:text-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {status === 'error' && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                  <div className="flex">
                    <div className="text-sm text-red-700 dark:text-red-400">{errorMessage}</div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md border border-transparent bg-auroville-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-sm text-auroville-primary hover:text-opacity-90"
                >
                  Back to login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 