import React from 'react';

interface ForumCategorySidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function ForumCategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: ForumCategorySidebarProps) {
  return (
    <div className="w-64 shrink-0">
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm">
        <div className="p-4 border-b dark:border-dark">
          <h2 className="font-medium text-gray-900 dark:text-dark-primary">Categories</h2>
        </div>
        <div className="p-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === null
                ? 'bg-auroville-light text-auroville-primary'
                : 'text-gray-600 dark:text-dark-secondary hover:bg-gray-100 dark:hover:bg-dark-lighter'
            }`}
          >
            All Discussions
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-auroville-light text-auroville-primary'
                  : 'text-gray-600 dark:text-dark-secondary hover:bg-gray-100 dark:hover:bg-dark-lighter'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 