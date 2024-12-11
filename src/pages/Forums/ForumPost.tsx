import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { api } from '../../lib/api';

export default function ForumPost() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['forum-post', postId],
    queryFn: async () => {
      const response = await api.get(`/forums/posts/${postId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-dark-lighter p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading post...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-dark-lighter p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-red-500">Error loading post. Please try again.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark-lighter">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/forums')}
          className="flex items-center gap-2 text-gray-600 dark:text-dark-secondary hover:text-gray-900 dark:hover:text-dark-primary mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Forums
        </button>

        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm">
          <div className="p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-primary mb-2">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-dark-secondary">
                <span>Posted by {post.author?.name || 'Anonymous'}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              {post.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
