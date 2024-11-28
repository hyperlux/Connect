import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthCallback mounted, checking URL parameters...');
    
    const handleAuthCallback = async () => {
      try {
        // Get error and access_token from URL query params
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error');
        const token = params.get('access_token');

        console.log('URL params:', { error, hasToken: !!token });

        if (error) {
          console.error('Auth error:', error);
          throw new Error(error);
        }

        // Handle the auth callback
        const { data, error: sessionError } = await supabase.auth.getSession();
        console.log('Session data:', data);

        if (sessionError) {
          throw sessionError;
        }

        if (data?.session) {
          console.log('Successfully authenticated, redirecting...');
          navigate('/', { replace: true });
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        navigate('/login', { replace: true });
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