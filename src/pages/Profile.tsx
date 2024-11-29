import React from 'react';
import { Settings, Bell, Shield, Key } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b">
            <div className="flex items-center gap-6">
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                alt={`${user.name}'s profile`}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500">Community Member since {joinDate}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">General Settings</h3>
                      <p className="text-sm text-gray-500">Update your profile information</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/settings/profile')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications</h3>
                      <p className="text-sm text-gray-500">Manage your notification preferences</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/settings/notifications')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Privacy</h3>
                      <p className="text-sm text-gray-500">Control your privacy settings</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/settings/privacy')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Manage
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Key className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Security</h3>
                      <p className="text-sm text-gray-500">Update password and security settings</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/settings/security')}
                    className="text-blue-600 hover:text-blue-700"
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