import React from 'react';
import { Users, Leaf, Heart, Globe } from 'lucide-react';
import TodayEvents from './components/TodayEvents';
import CriticalAnnouncements from './components/CriticalAnnouncements';
import Bazaar from './components/Bazaar';
import StatsGrid from './components/StatsGrid';
import CommunityHighlights from './components/CommunityHighlights';
import LatestPosts from './components/LatestPosts';
import ResourcesAndServices from './components/ResourcesAndServices';

const stats = [
  { label: 'Residents', value: '3,246', icon: Users, trend: '+12%' },
  { label: 'Active Projects', value: '186', icon: Leaf, trend: '+8%' },
  { label: 'Volunteer Programs', value: '42', icon: Heart, trend: '+15%' },
  { label: 'Visiting Groups', value: '24', icon: Globe, trend: '+5%' },
];

export default function Dashboard() {
  return (
    <div className="w-full h-full overflow-auto bg-[#1E1E1E]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        {/* Priority 1: Critical Announcements */}
        <div className="mb-6">
          <CriticalAnnouncements />
        </div>

        {/* Priority 2: Events and Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column - Events */}
          <div>
            <TodayEvents />
          </div>

          {/* Right Column - Posts */}
          <div>
            <LatestPosts />
          </div>
        </div>

        {/* Priority 3: Resources and Services */}
        <div className="mb-6">
          <ResourcesAndServices />
        </div>

        {/* Priority 4: Marketplace */}
        <div className="mb-6">
          <Bazaar />
        </div>

        {/* Priority 5: Additional Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <CommunityHighlights />
          </div>

          {/* Right Column */}
          <div>
            <StatsGrid stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
