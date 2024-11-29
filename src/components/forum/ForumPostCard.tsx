import { Link } from 'react-router-dom';
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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
  commentsCount: number;
  likesCount: number;
  views: number;
}

interface ForumPostCardProps {
  post: ForumPost;
}

export default function ForumPostCard({ post }: ForumPostCardProps) {
  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-dark-lighter transition-colors">
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
                {post.commentsCount} comments
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                {post.likesCount} likes
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {post.views} views
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 