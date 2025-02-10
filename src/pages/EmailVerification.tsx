import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing');
        return;
      }

      try {
        const { data } = await api.get(`/auth/verify-email?token=${token}`);
        
        // Successful verification
        if (data.verified) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          // Server returned verification failure
          console.error('Email verification failed:', data);
          setStatus('error');
          setMessage(data.message || 'Email verification could not be completed');
        }
      } catch (error) {
        // Comprehensive error handling
        let errorMessage = 'Failed to verify email';
        let logMessage = 'Email verification error';

        if (error instanceof Error) {
          // Axios error handling
          if (error.name === 'AxiosError') {
            const axiosError = error as any;
            
            // Specific error handling based on status code
            switch (axiosError.response?.status) {
              case 400:
                errorMessage = 'Invalid verification token';
                logMessage = 'Bad Request: Invalid token';
                break;
              case 401:
                errorMessage = 'Verification token has expired';
                logMessage = 'Unauthorized: Token expired';
                break;
              case 404:
                errorMessage = 'Verification link is no longer valid';
                logMessage = 'Not Found: Invalid verification link';
                break;
              case 500:
                errorMessage = 'Server error occurred during verification';
                logMessage = 'Internal Server Error during email verification';
                break;
              default:
                errorMessage = axiosError.response?.data?.message || 'Server error during email verification';
                logMessage = `Unhandled error status: ${axiosError.response?.status}`;
            }
          } else if (error.name === 'NetworkError') {
            errorMessage = 'Network connection failed. Please check your internet.';
            logMessage = 'Network Error during email verification';
          }

          // Log detailed error information
          console.error(logMessage, {
            name: error.name,
            message: error.message,
            stack: error.stack,
            additionalDetails: error instanceof Error ? (error as any).response?.data : null
          });
        }

        setStatus('error');
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
              <p className="text-gray-600">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Email Verified!</h2>
              <p className="text-gray-600">{message}</p>
              <p className="text-sm text-gray-500 mt-4">Redirecting to login page...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h2>
              <p className="text-gray-600">{message}</p>
              <button
                onClick={() => navigate('/login')}
                className="mt-4 text-auroville-primary hover:underline"
              >
                Return to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
