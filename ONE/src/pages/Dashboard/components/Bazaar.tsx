import React from 'react';
import { ShoppingBag, Tag, ArrowRight } from 'lucide-react';

const items = [
  {
    id: 1,
    title: 'Organic Vegetables',
    seller: 'Buddha Garden',
    price: '₹120/kg',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    title: 'Handmade Pottery',
    seller: 'Sacred Crafts',
    price: '₹450',
    category: 'Crafts',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    title: 'Bamboo Furniture',
    seller: 'Bamboo Center',
    price: '₹2,500',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

export default function Marketplace() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-auroville-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">Marketplace</h2>
        </div>
        <button className="text-sm text-auroville-primary hover:underline flex items-center gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-dark-primary">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-dark-secondary">{item.seller}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-medium text-auroville-primary">
                  {item.price}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-auroville-light text-auroville-primary text-xs">
                  <Tag className="h-3 w-3" />
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}