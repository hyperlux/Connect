import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, Plus, Filter, Search } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';
import ForumPostCard from '../components/forum/ForumPostCard';
import CreatePostModal from '../components/forum/CreatePostModal';
import ForumCategorySidebar from '../components/forum/ForumCategorySidebar';
import LoginForm from '../components/LoginForm';

const categories = [
  'General Discussion',
  'Announcements',
  'Community Projects',
  'Events & Activities',
  'Questions & Help',
  'Ideas & Proposals',
  'Working Groups',
  'Marketplace',
];

const sortOptions = [
  { value: 'hot', label: 'Hot' },
  { value: 'new', label: 'New' },
  { value: 'top', label: 'Top' },
];

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  score: number;
  _count?: {
    comments?: number;
    votes?: number;
  };
}

export default function Forums() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('hot');
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading, error } = useQuery<ForumPost[]>({
    queryKey: ['forum-posts', selectedCategory, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      params.append('sort', sortBy);
      const response = await api.get(`/forums/posts?${params.toString()}`);
      return response.data;
    },
  });

  const handleVote = (postId: string, newScore: number) => {
    queryClient.setQueryData<ForumPost[]>(['forum-posts', selectedCategory, sortBy], (oldPosts) => {
      if (!oldPosts) return [];
      return oldPosts.map(post => 
        post.id === postId ? { ...post, score: newScore } : post
      );
    });
  };

  const filteredPosts = React.useMemo(() => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  if (!isAuthenticated) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-dark-lighter p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-dark-primary">
            Sign in to Access Forums
          </h2>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-primary">
              Community Forums
            </h1>
            <p className="text-gray-600 dark:text-dark-secondary mt-1">
              Join discussions, share ideas, and connect with the community
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90"
          >
            <Plus className="h-5 w-5" />
            New Post
          </button>
        </div>

        <div className="flex gap-6">
          <ForumCategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="flex-1">
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm mb-6">
              <div className="p-4 border-b dark:border-dark">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-dark dark:bg-dark-lighter dark:text-dark-primary"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg border dark:border-dark dark:bg-dark-lighter dark:text-dark-primary"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-gray-500 dark:text-dark-secondary">
                  Loading discussions...
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  Error loading discussions. Please try again.
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-dark-secondary">
                  No discussions found. Start a new one!
                </div>
              ) : (
                <div className="divide-y dark:divide-dark">
                  {filteredPosts.map((post) => (
                    <ForumPostCard 
                      key={post.id} 
                      post={post} 
                      onVote={handleVote}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        categories={categories}
      />
    </div>
  );
}
