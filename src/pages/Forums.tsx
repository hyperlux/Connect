import React from 'react';
import { useQuery } from '@tanstack/react-query';
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

export default function Forums() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { isAuthenticated } = useAuth();

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['forum-posts', selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      const response = await api.get(`/api/forums/posts?${params.toString()}`);
      return response.data;
    },
  });

  const filteredPosts = React.useMemo(() => {
    if (!posts) return [];
    return posts.filter((post: any) =>
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
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-dark-secondary hover:bg-gray-100 dark:hover:bg-dark-lighter rounded-lg">
                    <Filter className="h-5 w-5" />
                    Filter
                  </button>
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
                  {filteredPosts.map((post: any) => (
                    <ForumPostCard key={post.id} post={post} />
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
