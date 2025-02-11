import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '../lib/supabase.js';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { 
    register: formRegister, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    watch 
  } = useForm<RegisterFormData>({
    mode: 'onBlur'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      reset();
      setSubmitError(null);
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    // Validate confirm password
    if (data.password !== data.confirmPassword) {
      setSubmitError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setSubmitError(null);

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name
          },
          emailRedirectTo: window.location.origin // Optional: set redirect URL
        }
      });

      if (error) throw error;
      
      // Note: Email verification is now handled by Supabase automatically
      onClose();
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create an Account</h2>
          <button onClick={onClose} disabled={isLoading}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {submitError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...formRegister('name', { 
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              })}
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...formRegister('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...formRegister('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...formRegister('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val: string) => {
                  const password = watch('password');
                  return password === val || 'Passwords do not match';
                }
              })}
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-auroville-primary hover:underline"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
