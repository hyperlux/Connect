import React from 'react';
import { Tag, MapPin } from 'lucide-react';

const products = [
  {
    id: 1,
    title: 'Fresh Organic Vegetables',
    description: 'Locally grown seasonal vegetables from Buddha Garden',
    price: '₹120/kg',
    category: 'Food & Produce',
    location: 'Buddha Garden',
    seller: 'Green Thumb Collective',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    title: 'Handcrafted Ceramic Plates',
    description: 'Set of 4 handmade ceramic plates with natural glazes',
    price: '₹1,800',
    category: 'Crafts',
    location: 'Sacred Crafts',
    seller: 'Pottery Studio',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    title: 'Bamboo Chair',
    description: 'Sustainable bamboo chair, perfect for indoor or outdoor use',
    price: '₹3,500',
    category: 'Furniture',
    location: 'Bamboo Center',
    seller: 'Bamboo Crafts',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

interface ProductGridProps {
  category: string;
  searchQuery: string;
}

export default function ProductGrid({ category, searchQuery }: ProductGridProps) {
  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white dark:bg-dark-card rounded-xl shadow-sm overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4 text-auroville-primary" />
              <span className="text-sm text-auroville-primary">{product.category}</span>
            </div>
            
            <h3 className="font-medium text-gray-900 dark:text-dark-primary mb-1">{product.title}</h3>
            <p className="text-sm text-gray-600 dark:text-dark-secondary mb-2">{product.description}</p>
            
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-dark-secondary mb-2">
              <MapPin className="h-4 w-4" />
              <span>{product.location}</span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="font-medium text-auroville-primary">{product.price}</span>
              <button className="px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}