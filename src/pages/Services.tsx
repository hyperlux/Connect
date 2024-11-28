import React from 'react';
import { Building2, Phone, Mail, ExternalLink } from 'lucide-react';

const categories = ['Healthcare', 'Education', 'Transportation', 'Utilities', 'Recreation', 'Financial'];

const services = [
  {
    id: 1,
    name: 'City Health Center',
    category: 'Healthcare',
    description: 'Primary healthcare services for residents',
    contact: {
      phone: '(555) 123-4567',
      email: 'health@cityname.gov',
      website: 'https://health.cityname.gov'
    },
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    name: 'Public Library',
    category: 'Education',
    description: 'Books, digital resources, and community programs',
    contact: {
      phone: '(555) 123-4568',
      email: 'library@cityname.gov',
      website: 'https://library.cityname.gov'
    },
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    name: 'Auroville Financial Service',
    category: 'Financial',
    description: 'Community banking and financial services',
    contact: {
      phone: '(555) 123-4569',
      email: 'finance@auroville.org',
      website: 'https://avfs.org.in/login.php'
    },
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">City Services</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Service
        </button>
      </div>

      <div className="flex gap-6">
        <aside className="w-64">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 ${
                    selectedCategory === 'All' ? 'bg-gray-100' : ''
                  }`}
                >
                  All Services
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 ${
                      selectedCategory === category ? 'bg-gray-100' : ''
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">{service.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-2" />
                      <span>{service.contact.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-2" />
                      <span>{service.contact.email}</span>
                    </div>
                    <a
                      href={service.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      <span>Visit Website</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}