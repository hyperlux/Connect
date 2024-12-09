import React from 'react';
import { Link } from 'react-router-dom';
import { Info, MapPin, Calendar, Book, Users, Leaf, Heart } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src="/firematri.png"
          alt="Auroville"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30">
          <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
            <img
              src="/logodark.png"
              alt="Auroville Logo"
              className="w-32 h-32 mb-8"
            />
            <h1 className="text-6xl font-bold text-white mb-6">
              Welcome to Auroville
            </h1>
            <p className="text-2xl text-white/90 italic mb-8 max-w-3xl">
              "Auroville wants to be the bridge between the past and the future."
            </p>
            <p className="text-xl text-white/80 mb-12">— The Mother</p>
            
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