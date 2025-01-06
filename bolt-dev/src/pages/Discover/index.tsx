import React from 'react';
import IntroSection from './components/IntroSection';
import InteractiveMap from './components/InteractiveMap';
import VisitorsGuide from './components/VisitorsGuide';
import TransportGuide from './components/TransportGuide';
import LiveUpdates from './components/LiveUpdates';

export default function Discover() {
  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Discover Auroville</h1>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <IntroSection />
          <InteractiveMap />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mt-6">
          <VisitorsGuide />
          <TransportGuide />
          <LiveUpdates />
        </div>
      </div>
    </div>
  );
}