import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ServiceFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function ServiceForm({ onClose, onSubmit, initialData }: ServiceFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Service' : 'Add New Service'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
            >
              <option value="">Select a category</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Recreation">Recreation</option>
              <option value="Financial">Financial</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={3}
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Operating Hours
            </label>
            <input
              type="text"
              {...register('hours')}
              placeholder="e.g., Mon-Fri: 9:00 AM - 5:00 PM"
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                {...register('contact.phone')}
                className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('contact.email')}
                className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <input
              type="url"
              {...register('contact.website')}
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              {...register('image')}
              className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90"
            >
              {initialData ? 'Save Changes' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}