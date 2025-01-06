import { MessageSquare, Heart, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    content: 'Just finished a wonderful permaculture workshop at Buddha Garden. Amazing to see how many community members are interested in sustainable farming!',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    likes: 45,
    comments: 12,
    time: '2 hours ago',
    category: 'latest'
  },
  {
    id: 2,
    author: {
      name: 'Michael Kumar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    content: 'Beautiful sunrise meditation at Matrimandir this morning. The energy was incredible!',
    image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    likes: 72,
    comments: 8,
    time: '5 hours ago',
    category: 'latest'
  },
  {
    id: 3,
    author: {
      name: 'Lily Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    content: 'Just attended a laughter day event at Auroville. It was so much fun!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    likes: 55,
    comments: 15,
    time: '3 hours ago',
    category: 'latest'
  },
  {
    id: 4,
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1531427186612-0f55ce5682f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    content: 'Excited about the upcoming Auroville Film Festival! Can\'t wait to see the movies.',
    image: 'https://images.unsplash.com/photo-1531427186612-0f55ce5682f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    likes: 60,
    comments: 10,
    time: '4 hours ago',
    category: 'latest'
  },
  {
    id: 5,
    author: {
      name: 'Emma Watson',
      avatar: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    content: 'Had a great time at the Auroville Yoga Retreat. Feeling incredibly rejuvenated!',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    likes: 80,
    comments: 20,
    time: '1 hour ago',
    category: 'trendy'
  },
  {
    id: 6,
    author: {
      name: 'David Brown',
      avatar: 'https://images.unsplash.com/photo-1531427186612-0f55ce5682f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    content: 'The Auroville Choir performance at the Sri Aurobindo Auditorium was amazing!',
    image: 'https://images.unsplash.com/photo-1531427186612-0f55ce5682f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    likes: 90,
    comments: 25,
    time: '2 hours ago',
    category: 'trendy'
  }
];

export default function LatestPosts() {
  return (
    <div className="col-span-2 grid gap-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Latest Community Posts</h2>
          <Link
            to="/app/forums"
            className="flex items-center gap-1 text-xs text-auroville-primary hover:text-auroville-primary/80 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {posts.filter(post => post.category === 'latest').map((post) => (
            <div key={post.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">{post.author.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.time}</p>
                </div>
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                {post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}
              </p>
              {post.content.length > 100 && (
                <Link
                  to={`/app/forums/posts/${post.id}`}
                  className="text-xs text-auroville-primary hover:text-auroville-primary/80 transition-colors"
                >
                  Read More
                </Link>
              )}

              <div className="flex items-center gap-4 text-xs mt-2">
                <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-auroville-primary dark:hover:text-auroville-primary transition-colors">
                  <Heart className="h-3 w-3" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-auroville-primary dark:hover:text-auroville-primary transition-colors">
                  <MessageSquare className="h-3 w-3" />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Most Trendy Community Posts</h2>
          <Link
            to="/app/forums"
            className="flex items-center gap-1 text-xs text-auroville-primary hover:text-auroville-primary/80 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {posts.filter(post => post.category === 'trendy').map((post) => (
            <div key={post.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">{post.author.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.time}</p>
                </div>
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                {post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}
              </p>
              {post.content.length > 100 && (
                <Link
                  to={`/app/forums/posts/${post.id}`}
                  className="text-xs text-auroville-primary hover:text-auroville-primary/80 transition-colors"
                >
                  Read More
                </Link>
              )}

              <div className="flex items-center gap-4 text-xs mt-2">
                <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-auroville-primary dark:hover:text-auroville-primary transition-colors">
                  <Heart className="h-3 w-3" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-auroville-primary dark:hover:text-auroville-primary transition-colors">
                  <MessageSquare className="h-3 w-3" />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
