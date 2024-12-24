import React, { useRef, useState } from 'react';
import { Settings, Bell, Shield, Key, Camera } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, uploadProfilePicture } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(0); // Add key to force re-render

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadProfilePicture(file);
        setKey(prev => prev + 1); // Force re-render after upload
      } catch (error) {
        console.error('Failed to upload profile picture:', error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!user) {
    return null; // or a loading spinner
  }

  // Format the join date
  const joinDate = user.createdAt 
    ? format(new Date(user.createdAt), 'MMMM yyyy')
    : 'Unknown date';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="dark:bg-dark-card rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  key={key}
                  src={`${user.profilePicture}?${key}`}
                  alt={`${user.name}'s profile`}
                  className="w-24 h-24 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
                  }}
                />
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 p-1.5 bg-auroville-primary rounded-full text-white hover:bg-opacity-90 transition-colors"
                  title="Change profile picture"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-primary">{user.name}</h1>
                <p className="text-gray-500 dark:text-dark-secondary">Community Member since {joinDate}</p>
                <p className="text-gray-500 dark:text-dark-secondary">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-lighter rounded-lg">
                  <div className="flex items-center gap-4">
                    <Settings className="h-5 w-5 text-gray-600 dark:text-dark-secondary" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-dark-primary">General Settings</h3>
                      <p className="text-sm text-gray-500 dark:text-dark-secondary">Update your profile information</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/app/settings/profile')}
                    className="text-auroville-primary hover:text-opacity-90"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-lighter rounded-lg">
                  <div className="flex items-center gap-4">
                    <Bell className="h-5 w-5 text-gray-600 dark:text-dark-secondary" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-dark-primary">Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-dark-secondary">Manage your notification preferences</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/app/settings/notifications')}
                    className="text-auroville-primary hover:text-opacity-90"
                  >
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-lighter rounded-lg">
                  <div className="flex items-center gap-4">
                    <Shield className="h-5 w-5 text-gray-600 dark:text-dark-secondary" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-dark-primary">Privacy</h3>
                      <p className="text-sm text-gray-500 dark:text-dark-secondary">Control your privacy settings</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/app/settings/privacy')}
                    className="text-auroville-primary hover:text-opacity-90"
                  >
                    Manage
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-lighter rounded-lg">
                  <div className="flex items-center gap-4">
                    <Key className="h-5 w-5 text-gray-600 dark:text-dark-secondary" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-dark-primary">Security</h3>
                      <p className="text-sm text-gray-500 dark:text-dark-secondary">Update password and security settings</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/app/settings/security')}
                    className="text-auroville-primary hover:text-opacity-90"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
