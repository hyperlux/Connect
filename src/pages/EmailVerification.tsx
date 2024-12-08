import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        
        if (!token) {
          setStatus('error');
          setMessage('Verification token is missing.');
          return;
        }

        const response = await api.get(`/auth/verify-email?token=${token}`);
        
        if (response.ok) {
          setStatus('success');
          setMessage('Email verified successfully! You can now log in.');
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          const data = await response.json();
          setStatus('error');
          setMessage(data.message || 'Verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred during verification. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1E1E] px-4">
      <div className="max-w-md w-full bg-[#2A2A2A] rounded-xl shadow-lg p-8">
        <div className="text-center">
          {status === 'verifying' && (
            <div className="animate-pulse">
              <h2 className="text-2xl font-bold text-white mb-4">Verifying Your Email</h2>
              <p className="text-gray-400">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <h2 className="text-2xl font-bold text-white">Verification Successful!</h2>
              <p className="text-gray-400">{message}</p>
              <button
                onClick={() => navigate('/login')}
                className="mt-4 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Go to Login
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
              <h2 className="text-2xl font-bold text-white">Verification Failed</h2>
              <p className="text-gray-400">{message}</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Go to Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 bg-[#333] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Register Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 