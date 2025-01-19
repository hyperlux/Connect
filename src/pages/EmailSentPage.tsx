import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function EmailSentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resendVerificationEmail, isLoading } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Get email from location state or localStorage
  const email = location.state?.email || localStorage.getItem('pendingVerificationEmail');

  const handleResendEmail = async () => {
    if (!email) {
      setError('Email address not found. Please try registering again.');
      return;
    }

    try {
      await resendVerificationEmail(email);
      setMessage('Verification email has been resent. Please check your inbox.');
      setError('');
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-dark-surface rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-text mb-2">Email Sent!</h2>
          <p className="text-dark-text-secondary">Please check your email for the verification link.</p>
          <p className="text-sm text-dark-text-tertiary mt-4">If you don't see the email, check your spam folder.</p>
          
          {message && (
            <p className="mt-4 text-sm text-green-400">{message}</p>
          )}
          
          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}

          <div className="mt-6 space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={isLoading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-auroville-primary rounded-md hover:bg-auroville-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroville-primary disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Resend Verification Email'}
            </button>

            <button
              onClick={() => navigate('/login')}
              className="w-full px-4 py-2 text-sm font-medium text-auroville-primary bg-transparent border border-auroville-primary rounded-md hover:bg-auroville-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroville-primary"
            >
              Return to Login
            </button>
          </div>

          <p className="mt-6 text-xs text-dark-text-tertiary">
            Having trouble? Contact support at support@auroville.social
          </p>
        </div>
      </div>
    </div>
  );
}
