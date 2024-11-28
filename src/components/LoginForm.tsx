import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resending, setResending] = useState(false);
  const { login, register, isLoading, error, clearError } = useAuth();

  const handleResendVerification = async () => {
    try {
      setResending(true);
      await api.post('/auth/resend-verification', { email });
      alert('Verification email has been resent. Please check your inbox.');
    } catch (err: any) {
      alert(err.message || 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isSignUp) {
        await register({ email, password, name });
        setEmail('');
        setPassword('');
        setName('');
        alert('Please check your email to verify your account');
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      console.error('Form submission error:', err);
      // Show resend button if email not verified
      if (err.message?.includes('verify your email')) {
        return;
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignUp ? 'Create Account' : 'Login to Auroville'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          {error.includes('verify your email') && (
            <button
              onClick={handleResendVerification}
              disabled={resending}
              className="ml-2 text-sm underline hover:no-underline focus:outline-none"
            >
              {resending ? 'Sending...' : 'Resend verification email'}
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required={isSignUp}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? (isSignUp ? 'Creating Account...' : 'Logging in...') : 
                    (isSignUp ? 'Create Account' : 'Login')}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button 
          onClick={() => {
            setIsSignUp(!isSignUp);
            clearError();
          }}
          className="text-blue-600 hover:text-blue-500"
        >
          {isSignUp ? 'Login' : 'Sign up'}
        </button>
      </p>
    </div>
  );
} 