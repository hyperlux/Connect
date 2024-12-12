import { Link } from 'react-router-dom';
import { MessageSquare, ChevronUp, ChevronDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { api } from '../../lib/api';
import { useAuth } from '../../lib/auth';
import { useState } from 'react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  score: number;
  _count?: {
    comments?: number;
    votes?: number;
  };
}

interface ForumPostCardProps {
  post: ForumPost;
  onVote: (postId: string, newScore: number) => void;
}

export default function ForumPostCard({ post, onVote }: ForumPostCardProps) {
  const { isAuthenticated } = useAuth();
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (value: number) => {
    if (!isAuthenticated) {
      // TODO: Show login modal
      return;
    }

    if (isVoting) return;

    try {
      setIsVoting(true);
      const response = await api.post(`/forums/posts/${post.id}/vote`, { value });
      onVote(post.id, response.data.score);
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-dark-lighter transition-colors flex gap-4">
      {/* Vote buttons */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => handleVote(1)}
          className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-dark-lighter transition-colors
            ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isVoting}
        >
          <ChevronUp className="h-6 w-6 text-gray-500 dark:text-dark-secondary" />
        </button>
        
        <span className="font-medium text-gray-700 dark:text-dark-primary">
          {post.score}
        </span>
        
        <button
          onClick={() => handleVote(-1)}
          className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-dark-lighter transition-colors
            ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isVoting}
        >
          <ChevronDown className="h-6 w-6 text-gray-500 dark:text-dark-secondary" />
        </button>
      </div>

      {/* Post content */}
      <div className="flex-1">
        <Link to={`/forums/${post.id}`} className="block">
          <div className="flex items-start gap-4">
            <img
              src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=E27B58&color=fff`}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-primary mb-1">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-dark-secondary mb-2 line-clamp-2">
                {post.content}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="px-2 py-1 bg-gray-100 dark:bg-dark-lighter text-gray-600 dark:text-dark-secondary rounded">
                  {post.category}
                </span>
                <span className="text-gray-500 dark:text-dark-secondary">
                  Posted by {post.author.name}
                </span>
                <span className="text-gray-500 dark:text-dark-secondary">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 dark:text-dark-secondary">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {post._count?.comments || 0} comments
                </div>
                <div className="flex items-center gap-2">
                  {post._count?.votes || 0} votes
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
