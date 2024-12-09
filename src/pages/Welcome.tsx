import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, MapPin, Calendar, Book, Users, Leaf, Heart, Menu, X } from 'lucide-react';

export default function Welcome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      {/* Navigation Bar */}
      <nav className="bg-[#2A2A2A] fixed w-full z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/logodark.png" alt="Auroville" className="h-8" />
              <span className="text-white font-semibold ml-3">Auroville</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white">About</a>
              <a href="#visit" className="text-gray-300 hover:text-white">Visit</a>
              <a href="#activities" className="text-gray-300 hover:text-white">Activities</a>
              <a href="#resources" className="text-gray-300 hover:text-white">Resources</a>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90"
              >
                Community Portal
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#2A2A2A] border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#about" className="block text-gray-300 hover:text-white">About</a>
              <a href="#visit" className="block text-gray-300 hover:text-white">Visit</a>
              <a href="#activities" className="block text-gray-300 hover:text-white">Activities</a>
              <a href="#resources" className="block text-gray-300 hover:text-white">Resources</a>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="w-full px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90"
              >
                Community Portal
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] p-8 rounded-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
              <button onClick={() => setShowLogin(false)}>
                <X className="h-6 w-6 text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-[#1E1E1E] border border-[#333] rounded-lg text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-[#1E1E1E] border border-[#333] rounded-lg text-white"
                  placeholder="Enter your password"
                />
              </div>
              <button className="w-full px-4 py-2 bg-auroville-primary text-white rounded-lg">
                Sign In
              </button>
              <div className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-auroville-primary hover:text-opacity-80">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-[#1E1E1E]">
          <img
            src="/firematri.png"
            alt="Auroville"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30">
            <div className="container mx-auto px-6 h-full flex flex-col justify-center">
              <div className="max-w-2xl">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Welcome to Auroville
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  A universal city in the making dedicated to human unity and conscious living.
                </p>
                <a
                  href="#about"
                  className="inline-block px-6 py-3 bg-auroville-primary text-white rounded-lg text-lg hover:bg-opacity-90"
                >
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-[#2A2A2A]">
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
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">About Auroville</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-[#2A2A2A] p-8 rounded-xl">
                <Info className="w-8 h-8 text-auroville-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
                <p className="text-gray-400">
                  Auroville is an experimental township dedicated to human unity and conscious living.
                </p>
              </div>
              <div className="bg-[#2A2A2A] p-8 rounded-xl">
                <MapPin className="w-8 h-8 text-auroville-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Location</h3>
                <p className="text-gray-400">
                  Located in Tamil Nadu, India, near Puducherry, with the Matrimandir at its center.
                </p>
              </div>
              <div className="bg-[#2A2A2A] p-8 rounded-xl">
                <Users className="w-8 h-8 text-auroville-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Community</h3>
                <p className="text-gray-400">
                  A diverse community from around the world working together in various fields.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Section */}
        <section id="visit" className="py-20 bg-[#2A2A2A]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Plan Your Visit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Visitor Information</h3>
                <ul className="text-gray-400 space-y-3">
                  <li>• Visitor Center: 9:00 AM - 5:30 PM</li>
                  <li>• Matrimandir Viewing: 9:00 AM - 5:00 PM</li>
                  <li>• Guided Tours Available</li>
                  <li>• Guest Houses and Accommodations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Getting Here</h3>
                <p className="text-gray-400">
                  Located 150km south of Chennai. Nearest airport is Chennai International Airport.
                  Regular buses and taxis available from Puducherry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Activities & Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#2A2A2A] p-6 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-2">Workshops</h3>
                <p className="text-gray-400">Regular workshops on various topics including yoga, art, and sustainability.</p>
              </div>
              <div className="bg-[#2A2A2A] p-6 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-2">Cultural Events</h3>
                <p className="text-gray-400">Music performances, dance shows, and art exhibitions throughout the year.</p>
              </div>
              <div className="bg-[#2A2A2A] p-6 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-2">Volunteering</h3>
                <p className="text-gray-400">Opportunities to contribute to various community projects and initiatives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-20 bg-[#2A2A2A]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="#" className="bg-[#1E1E1E] p-6 rounded-xl hover:bg-opacity-80 transition-colors">
                <Book className="w-6 h-6 text-auroville-primary mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Publications</h3>
                <p className="text-gray-400">Access our library of publications and research.</p>
              </a>
              <a href="#" className="bg-[#1E1E1E] p-6 rounded-xl hover:bg-opacity-80 transition-colors">
                <Leaf className="w-6 h-6 text-auroville-primary mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Sustainability</h3>
                <p className="text-gray-400">Learn about our environmental initiatives.</p>
              </a>
              <a href="#" className="bg-[#1E1E1E] p-6 rounded-xl hover:bg-opacity-80 transition-colors">
                <Heart className="w-6 h-6 text-auroville-primary mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Support</h3>
                <p className="text-gray-400">Ways to contribute to Auroville's development.</p>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1E1E1E] py-12 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <img src="/logodark.png" alt="Auroville" className="h-8 mb-4" />
                <p className="text-gray-400">
                  Auroville Universal Township<br />
                  Tamil Nadu, India
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#about" className="hover:text-white">About</a></li>
                  <li><a href="#visit" className="hover:text-white">Visit</a></li>
                  <li><a href="#activities" className="hover:text-white">Activities</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Publications</a></li>
                  <li><a href="#" className="hover:text-white">Research</a></li>
                  <li><a href="#" className="hover:text-white">Media</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">Newsletter</a></li>
                  <li><a href="#" className="hover:text-white">Support</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>© 2024 Auroville. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
} 