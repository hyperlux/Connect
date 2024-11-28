import React from 'react';
import { Settings, Bell, Shield, Key } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b">
            <div className="flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">John Smith</h1>
                <p className="text-gray-500">Community Member since January 2024</p>
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
                  <button className="text-blue-600 hover:text-blue-700">Edit</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications</h3>
                      <p className="text-sm text-gray-500">Manage your notification preferences</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">Configure</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Privacy</h3>
                      <p className="text-sm text-gray-500">Control your privacy settings</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">Manage</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Key className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Security</h3>
                      <p className="text-sm text-gray-500">Update password and security settings</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">Change</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}