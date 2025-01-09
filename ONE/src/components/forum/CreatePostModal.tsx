import { X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
}

interface CreatePostFormData {
  title: string;
  category: string;
  content: string;
}

export default function CreatePostModal({ isOpen, onClose, categories }: CreatePostModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreatePostFormData>();

  const createPost = useMutation({
    mutationFn: async (data: CreatePostFormData) => {
      const response = await api.post('/forums/posts', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
      reset();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-card rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-primary">
            Create New Post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-dark-secondary"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => createPost.mutate(data))}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">
                Title
              </label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="w-full rounded-lg border dark:border-dark dark:bg-dark-lighter dark:text-dark-primary"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">
                Category
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full rounded-lg border dark:border-dark dark:bg-dark-lighter dark:text-dark-primary"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">
                Content
              </label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows={6}
                className="w-full rounded-lg border dark:border-dark dark:bg-dark-lighter dark:text-dark-primary"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.content.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-dark-secondary hover:bg-gray-100 dark:hover:bg-dark-lighter rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createPost.isPending}
              className="px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 flex items-center gap-2"
            >
              {createPost.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
