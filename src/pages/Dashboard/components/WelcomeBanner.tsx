import React from 'react';

export default function WelcomeBanner() {
  return (
    <div className="relative h-[280px] rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/firematri.png"
          alt="Matrimandir"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome to Auroville</h2>
            <p className="text-base mb-2 italic">"Auroville wants to be the bridge between the past and the future."</p>
            <p className="text-xs">— The Mother</p>
          </div>
        </div>
      </div>
    </div>
  );
}