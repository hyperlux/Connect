import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/auth';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthCallback mounted, checking URL parameters...');
    
    const handleAuthCallback = async () => {
      try {
        // Get token from URL query params
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        console.log('URL params:', { hasToken: !!token });

        if (!token) {
          throw new Error('No verification token found');
        }

        // Verify email with our backend
        const response = await api.get(`/auth/verify-email?token=${token}`);
        console.log('Verification response:', response.data);

        if (response.data.verified || response.data.alreadyVerified) {
          console.log('Successfully verified email, redirecting to login...');
          navigate('/login', { 
            replace: true,
            state: { 
              message: 'Email verified successfully! You can now log in.' 
            }
          });
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        navigate('/login', { 
          replace: true,
          state: { 
            error: 'Email verification failed. Please try again or contact support.' 
          }
        });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Verifying...</h2>
        <p className="text-gray-600">Please wait while we verify your email.</p>
      </div>
    </div>
  );
}
