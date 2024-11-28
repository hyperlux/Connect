import React, { useState } from 'react';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import NewListingButton from './components/NewListingButton';

const categories = [
  'All',
  'Food & Produce',
  'Crafts',
  'Furniture',
  'Clothing',
  'Services',
  'Tools',
  'Books',
  'Others'
];

export default function Bazaar() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-primary">Auroville Bazaar</h1>
          <NewListingButton />
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <CategoryFilter 
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <ProductGrid 
              category={selectedCategory}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}