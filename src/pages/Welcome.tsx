import React from 'react';
import { Link } from 'react-router-dom';

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
              Welcome to Auroville Community
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
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-8 py-3 bg-white/10 text-white rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-[#1E1E1E] py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Connect</h3>
              <p className="text-gray-400">
                Join a vibrant community of Aurovilians and stay connected with events, 
                forums, and local initiatives.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Collaborate</h3>
              <p className="text-gray-400">
                Participate in community decisions, share resources, and contribute 
                to Auroville's growth.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Create</h3>
              <p className="text-gray-400">
                Be part of building the city of dawn, share your ideas, and help 
                shape our future together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 