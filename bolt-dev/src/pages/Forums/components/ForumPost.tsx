import React from 'react';
import { MessageSquare, Users, Clock } from 'lucide-react';

interface ForumPostProps {
  post: {
    id: number;
    title: string;
    category: string;
    author: string;
    avatar: string;
    replies: number;
    views: number;
    lastActivity: string;
  };
}

export default function ForumPost({ post }: ForumPostProps) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
          <p className="text-sm text-gray-500">
            Posted by {post.author} in {post.category}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>{post.replies} replies</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{post.views} views</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Last activity {post.lastActivity}</span>
        </div>
      </div>
    </div>
  );
}