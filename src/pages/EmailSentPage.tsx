import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmailSentPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h2>
          <p className="text-gray-600">Please check your email for the verification link.</p>
          <p className="text-sm text-gray-500 mt-4">If you don't see the email, check your spam folder.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 text-auroville-primary hover:underline"
          >
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
} 