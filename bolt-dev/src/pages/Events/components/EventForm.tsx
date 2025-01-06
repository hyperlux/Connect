import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { CalendarEvent } from '../../../lib/calendar';

interface EventFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isDark?: boolean;
  initialData?: CalendarEvent;
}

export default function EventForm({ onClose, onSubmit, isDark, initialData }: EventFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
    defaultValues: initialData
  });
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setImagePreview(initialData.image);
    }
  }, [initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setValue('image', result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('image', '');
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${
        isDark ? 'bg-dark-card' : 'bg-white'
      } rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${
            isDark ? 'text-dark-primary' : 'text-gray-900'
          }`}>
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button 
            onClick={onClose}
            className={`${
              isDark ? 'text-dark-secondary hover:text-dark-primary' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-secondary' : 'text-gray-700'
            }`}>
              Event Image
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-4 text-center ${
                isDragging
                  ? 'border-auroville-primary bg-auroville-light'
                  : isDark
                    ? 'border-dark text-dark-secondary hover:border-auroville-primary'
                    : 'border-gray-300 text-gray-600 hover:border-auroville-primary'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <ImageIcon className="h-12 w-12 mb-2 text-auroville-primary" />
                    <span className="text-sm">
                      Drag and drop an image here, or click to select
                    </span>
                    <span className="text-xs mt-1 text-gray-500">
                      Supports: JPG, PNG, GIF (max 5MB)
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-secondary' : 'text-gray-700'
            }`}>
              Event Title
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`w-full rounded-lg ${
                isDark 
                  ? 'bg-dark-lighter border-dark text-dark-primary placeholder-dark-secondary'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message as string}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-secondary' : 'text-gray-700'
            }`}>
              Category
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className={`w-full rounded-lg ${
                isDark 
                  ? 'bg-dark-lighter border-dark text-dark-primary'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            >
              <option value="">Select a category</option>
              <option value="cultural">Cultural</option>
              <option value="educational">Educational</option>
              <option value="spiritual">Spiritual</option>
              <option value="community">Community</option>
              <option value="environmental">Environmental</option>
              <option value="arts">Arts & Crafts</option>
              <option value="sports">Sports & Wellness</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message as string}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-secondary' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={3}
              className={`w-full rounded-lg ${
                isDark 
                  ? 'bg-dark-lighter border-dark text-dark-primary placeholder-dark-secondary'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-dark-secondary' : 'text-gray-700'
              }`}>
                Start Date
              </label>
              <input
                type="date"
                {...register('date', { required: 'Start date is required' })}
                className={`w-full rounded-lg ${
                  isDark 
                    ? 'bg-dark-lighter border-dark text-dark-primary'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message as string}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-dark-secondary' : 'text-gray-700'
              }`}>
                Start Time
              </label>
              <input
                type="time"
                {...register('time', { required: 'Start time is required' })}
                className={`w-full rounded-lg ${
                  isDark 
                    ? 'bg-dark-lighter border-dark text-dark-primary'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time.message as string}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-dark-secondary' : 'text-gray-700'
              }`}>
                End Time
              </label>
              <input
                type="time"
                {...register('endTime', { 
                  required: 'End time is required',
                  validate: value => {
                    const startTime = getValues('time');
                    return !startTime || value > startTime || 'End time must be after start time';
                  }
                })}
                className={`w-full rounded-lg ${
                  isDark 
                    ? 'bg-dark-lighter border-dark text-dark-primary'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
              />
              {errors.endTime && (
                <p className="mt-1 text-sm text-red-600">{errors.endTime.message as string}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-dark-secondary' : 'text-gray-700'
              }`}>
                Available Spots
              </label>
              <input
                type="number"
                min="1"
                {...register('maxSpots', { 
                  required: 'Number of spots is required',
                  min: {
                    value: 1,
                    message: 'Must have at least 1 spot'
                  },
                  valueAsNumber: true
                })}
                placeholder="Enter number of spots"
                className={`w-full rounded-lg ${
                  isDark 
                    ? 'bg-dark-lighter border-dark text-dark-primary placeholder-dark-secondary'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
              />
              {errors.maxSpots && (
                <p className="mt-1 text-sm text-red-600">{errors.maxSpots.message as string}</p>
              )}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-secondary' : 'text-gray-700'
            }`}>
              Location
            </label>
            <input
              type="text"
              {...register('location', { required: 'Location is required' })}
              className={`w-full rounded-lg ${
                isDark 
                  ? 'bg-dark-lighter border-dark text-dark-primary placeholder-dark-secondary'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message as string}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                isDark
                  ? 'border-dark text-dark-primary hover:bg-dark-lighter'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90"
            >
              {isEditing ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}