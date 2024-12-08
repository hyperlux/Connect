import React, { useRef } from 'react';
import { useAuth } from '../../lib/auth';
import { useForm } from 'react-hook-form';

interface ProfileFormData {
  name: string;
  email: string;
  bio?: string;
}

export default function ProfileSettings() {
  const { user, updateProfile, uploadProfilePicture } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await uploadProfilePicture(file);
      alert('Profile picture updated successfully');
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
      alert('Failed to upload profile picture. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary mb-6">Profile Settings</h2>
      
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <img
            src={user?.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt={`${user?.name}'s profile`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={handleUploadClick}
              disabled={isUploading}
              className="px-4 py-2 bg-auroville-primary text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:ring-offset-2 dark:focus:ring-offset-dark disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Change Profile Picture'}
            </button>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-primary mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-lighter dark:text-dark-primary shadow-sm focus:border-auroville-primary focus:ring-auroville-primary"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-primary mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-lighter dark:text-dark-primary shadow-sm focus:border-auroville-primary focus:ring-auroville-primary"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-dark-primary mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            {...register('bio')}
            rows={4}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-lighter dark:text-dark-primary shadow-sm focus:border-auroville-primary focus:ring-auroville-primary"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-auroville-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroville-primary dark:focus:ring-offset-dark disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 