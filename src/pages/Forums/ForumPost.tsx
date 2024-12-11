import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/auth';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Eye } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

interface ForumPostData {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  comments: Comment[];
  commentsCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function ForumPost() {
  const { forumId } = useParams();
  
  const { data: post, isLoading, error } = useQuery<ForumPostData>({
    queryKey: ['forum-post', forumId],
    queryFn: async () => {
      const response = await api.get(`/forums/${forumId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-8">
          <div className="text-center text-gray-500 dark:text-dark-secondary">
            Loading post...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-8">
          <div className="text-center text-red-500">
            Error loading post. Please try again.
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-8">
          <div className="text-center text-gray-500 dark:text-dark-secondary">
            Post not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Post Content */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm mb-6">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-dark-primary">
                {post.author.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-dark-secondary">
                Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-primary mb-2">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm mb-6">
            <span className="px-3 py-1 bg-gray-100 dark:bg-dark-lighter text-gray-600 dark:text-dark-secondary rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-gray-500 dark:text-dark-secondary">
              <MessageSquare className="h-4 w-4" />
              {post.commentsCount} comments
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-dark-secondary">
              <Eye className="h-4 w-4" />
              {post.views} views
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {post.content}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm">
        <div className="p-6 border-b dark:border-dark">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-primary">
            Comments ({post.commentsCount})
          </h2>
        </div>

        <div className="divide-y dark:divide-dark">
          {post.comments.map((comment) => (
            <div key={comment.id} className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-dark-primary">
                      {comment.author.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-dark-secondary">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-dark-secondary">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
