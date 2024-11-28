import React from 'react';

interface Category {
  id: number;
  name: string;
  count: number;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (id: number) => void;
}

export default function CategoryList({ categories, selectedCategory, onSelectCategory }: CategoryListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onSelectCategory(category.id)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{category.name}</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                selectedCategory === category.id
                  ? 'bg-blue-100'
                  : 'bg-gray-100'
              }`}>
                {category.count}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}