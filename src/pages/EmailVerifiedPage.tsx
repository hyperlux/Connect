import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmailVerifiedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Email Verified!</h2>
          <p className="text-gray-600">Your email has been successfully verified. You can now log in.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 text-auroville-primary hover:underline"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
} 