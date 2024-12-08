import React from 'react';
import { X } from 'lucide-react';
import { useForumStore } from '../../../lib/forum';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  'General',
  'Announcements',
  'Events',
  'Projects',
  'Questions',
  'Community',
  'Working Groups',
  'Marketplace'
];

export default function NewPostModal({ isOpen, onClose }: NewPostModalProps) {
  const createPost = useForumStore(state => state.createPost);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) return;

    setIsSubmitting(true);
    try {
      await createPost({
        title,
        content,
        category
      });
      onClose();
      setTitle('');
      setContent('');
      setCategory('');
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-card rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-primary">Start New Discussion</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 dark:text-dark-secondary hover:text-gray-700 dark:hover:text-dark-primary"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter discussion title"
              className="w-full px-4 py-2 rounded-lg border dark:border-dark-hover dark:bg-dark-lighter dark:text-dark-primary focus:ring-2 focus:ring-auroville-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-dark-hover dark:bg-dark-lighter dark:text-dark-primary focus:ring-2 focus:ring-auroville-primary"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your discussion content..."
              rows={6}
              className="w-full px-4 py-2 rounded-lg border dark:border-dark-hover dark:bg-dark-lighter dark:text-dark-primary focus:ring-2 focus:ring-auroville-primary"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-hover text-gray-700 dark:text-dark-secondary rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Discussion'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}