import { MessageSquare, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useForumStore, type ForumState } from '../../lib/forum';
import NewPostModal from './components/NewPostModal';
import { useEffect, useState } from 'react';

export default function Forums() {
  const [showNewPost, setShowNewPost] = useState(false);
  const { 
    posts, 
    categories, 
    selectedCategory,
    currentPage,
    totalPosts,
    postsPerPage,
    sortBy,
    isLoading, 
    error,
    fetchPosts,
    setSelectedCategory,
    setSortBy
  } = useForumStore();

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-primary">Community Forums</h1>
        <button
          onClick={() => setShowNewPost(true)}
          className="bg-auroville-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
        >
          New Discussion
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary mb-4">Categories</h2>
            <ul className="space-y-3">
              {['All', ...categories].map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center justify-between text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover ${
                      selectedCategory === category 
                        ? 'bg-auroville-light text-auroville-primary dark:bg-auroville-primary/20' 
                        : 'text-gray-700 dark:text-dark-secondary'
                    }`}
                  >
                    <span>{category}</span>
                    <span className="bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-dark-secondary px-2 py-1 rounded-full text-sm">
                      {category === 'All' ? totalPosts : posts.filter(post => post.category === category).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary mb-4">Sort By</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as ForumState['sortBy'])}
                className="w-full p-2 border rounded-lg dark:bg-dark-card dark:border-dark-hover"
              >
                <option value="newest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="active">Most Active</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 text-center text-gray-500 dark:text-dark-secondary">
              Loading discussions...
            </div>
          ) : error ? (
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 text-center text-red-600">
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 text-center text-gray-500 dark:text-dark-secondary">
              No discussions found in this category.
            </div>
          ) : (
            <>
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-dark-hover">
                {posts.map((post) => (
                  <div key={post.id} className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">{post.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-dark-secondary">
                          Posted by {post.author.name} in {post.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-dark-secondary">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments} comments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{post.likes} likes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Updated {new Date(post.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPosts > postsPerPage && (
                <div className="mt-6 flex justify-center gap-2">
                  <button
                    onClick={() => fetchPosts(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white dark:bg-dark-card shadow-sm disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <span className="px-4 py-2 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                    Page {currentPage} of {Math.ceil(totalPosts / postsPerPage)}
                  </span>

                  <button
                    onClick={() => fetchPosts(currentPage + 1)}
                    disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
                    className="p-2 rounded-lg bg-white dark:bg-dark-card shadow-sm disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <NewPostModal 
        isOpen={showNewPost} 
        onClose={() => setShowNewPost(false)} 
      />
    </div>
  );
}