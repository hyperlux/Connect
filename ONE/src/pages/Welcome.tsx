import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Info, MapPin, Calendar, Book, Users, Leaf, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../lib/auth';

const carouselImages = [
  {
    url: '/auroimgs/fred-c-drone-photos_43068849880_o.jpg',
    title: 'Matrimandir',
    description: 'The soul of Auroville - A place for concentration'
  },
  {
    url: '/auroimgs/05jogging-in-the-green-belt_29944057187_o.jpg',
    title: 'Green Belt',
    description: 'Connecting with nature through outdoor activities'
  },
  {
    url: '/auroimgs/06residential-zone_44160197054_o.jpg',
    title: 'Residential Zone',
    description: 'Living spaces in harmony with nature'
  },
  {
    url: '/auroimgs/08architecture_44830142842_o.jpg',
    title: 'Unique Architecture',
    description: 'Innovative and sustainable design'
  },
  {
    url: '/auroimgs/14botanical-garden-nursery_43068782600_o.jpg',
    title: 'Botanical Gardens',
    description: 'Preserving biodiversity'
  },
  {
    url: '/auroimgs/18permaculture-garden_44880878331_o.jpg',
    title: 'Permaculture Gardens',
    description: 'Sustainable food systems'
  }
];

// Override default layout styles for Welcome page
if (typeof document !== 'undefined') {
  document.getElementById('root')?.classList.add('!block', '!w-full');
}

export default function Welcome() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if user is authenticated
    if (isAuthenticated()) {
      navigate('/app/dashboard', { replace: true });
      return;
    }

    // Override layout styles when component mounts
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'block';
      root.style.width = '100%';
      root.style.gridTemplateColumns = 'none';
    }

    // Cleanup when component unmounts
    return () => {
      if (root) {
        root.style.display = '';
        root.style.width = '';
        root.style.gridTemplateColumns = '';
      }
    };
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImageIndex]);

  const nextImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] w-full">
      {/* Hero Section with Carousel */}
      <div className="relative h-screen">
        {/* Logo Header */}
        <div className="absolute top-6 left-0 z-20 p-4">
          <img
            src="/logodark.png"
            alt="Auroville Logo"
            className="h-12 w-auto"
          />
        </div>

        {carouselImages.map((image, index) => (
          <div
            key={image.url}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30">
              <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
                <h1 className="text-6xl font-bold text-white mb-6 mt-12">
                  {image.title}
                </h1>
                <p className="text-2xl text-white/90 mb-8">
                  {image.description}
                </p>
                
                {/* Call to Action Buttons */}
                <div className="flex gap-6">
                  <Link
                    to="/login"
                    className="px-8 py-3 bg-auroville-primary text-white rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Community Portal
                  </Link>
                  <a
                    href="#learn-more"
                    className="px-8 py-3 bg-white/10 text-white rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-[#1E1E1E] py-12 border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-auroville-primary mb-2">3,200+</div>
              <div className="text-gray-400">Residents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-auroville-primary mb-2">56</div>
              <div className="text-gray-400">Nationalities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-auroville-primary mb-2">1968</div>
              <div className="text-gray-400">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-auroville-primary mb-2">20km²</div>
              <div className="text-gray-400">Township Area</div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <div id="learn-more" className="bg-[#1E1E1E] py-20">
        <div className="container mx-auto px-6">
          {/* About Auroville */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">About Auroville</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-[#2A2A2A] p-8 rounded-xl">
                <Info className="w-8 h-8 text-auroville-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
                <p className="text-gray-400">
                  Auroville is an experimental township in South India dedicated to human unity and 
                  conscious living. Founded in 1968, it's a place where people from all over the world 
                  come together to build a universal city.
                </p>
              </div>
              <div className="bg-[#2A2A2A] p-8 rounded-xl">
                <MapPin className="w-8 h-8 text-auroville-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Location</h3>
                <p className="text-gray-400">
                  Located in Tamil Nadu, India, near Puducherry. The township spans across 20 square kilometers,
                  with the Matrimandir at its center, surrounded by various zones including residential,
                  cultural, and industrial areas.
                </p>
              </div>
              <div className="bg-[#2A2A2A] p-8 rounded-xl">
                <Users className="w-8 h-8 text-auroville-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Community</h3>
                <p className="text-gray-400">
                  Home to over 3,200 residents from around 56 different countries. The community works
                  together in various fields including education, environmental regeneration, health care,
                  and cultural activities.
                </p>
              </div>
            </div>
          </div>

          {/* Visitor Information */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Visitor Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-[#2A2A2A] p-8 rounded-xl">
                <Calendar className="w-8 h-8 text-auroville-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Planning Your Visit</h3>
                <ul className="text-gray-400 space-y-3">
                  <li>• Visitor Center open daily: 9:00 AM - 5:30 PM</li>
                  <li>• Matrimandir viewing point: 9:00 AM - 5:00 PM</li>
                  <li>• Guided tours available</li>
                  <li>• Various guest houses and accommodations</li>
                </ul>
              </div>
              <div className="bg-[#2A2A2A] p-8 rounded-xl">
                <Book className="w-8 h-8 text-auroville-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Activities & Programs</h3>
                <ul className="text-gray-400 space-y-3">
                  <li>• Cultural events and workshops</li>
                  <li>• Volunteering opportunities</li>
                  <li>• Educational programs</li>
                  <li>• Art exhibitions and performances</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="#" className="bg-[#2A2A2A] p-6 rounded-xl hover:bg-[#333] transition-colors">
                <Leaf className="w-6 h-6 text-auroville-primary mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Sustainability</h3>
                <p className="text-gray-400 text-sm">
                  Learn about our environmental initiatives and sustainable practices.
                </p>
              </a>
              <a href="#" className="bg-[#2A2A2A] p-6 rounded-xl hover:bg-[#333] transition-colors">
                <Heart className="w-6 h-6 text-auroville-primary mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Get Involved</h3>
                <p className="text-gray-400 text-sm">
                  Discover ways to participate and contribute to Auroville's growth.
                </p>
              </a>
              <a href="#" className="bg-[#2A2A2A] p-6 rounded-xl hover:bg-[#333] transition-colors">
                <Book className="w-6 h-6 text-auroville-primary mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Publications</h3>
                <p className="text-gray-400 text-sm">
                  Access our library of publications, research, and documentation.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <img src="/logodark.png" alt="Auroville" className="h-12 mx-auto mb-6" />
            <p className="text-gray-400 mb-6">
              Auroville Universal Township • Tamil Nadu, India
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/login" className="text-auroville-primary hover:text-opacity-80">
                Community Portal
              </Link>
              <a href="#" className="text-auroville-primary hover:text-opacity-80">
                Contact
              </a>
              <a href="#" className="text-auroville-primary hover:text-opacity-80">
                Newsletter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
