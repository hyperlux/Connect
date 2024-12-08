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
    <div className="flex-1 overflow-auto bg-[#1E1E1E]">
      <div className="ml-52 max-w-full">
        <div className="px-4 py-4 space-y-4">
          {/* Priority 1: Critical Announcements */}
          <div className="max-w-[calc(100vw-240px)]">
            <CriticalAnnouncements />
          </div>

          {/* Priority 2: Resources and Services */}
          <div className="max-w-[calc(100vw-240px)]">
            <ResourcesAndServices />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[calc(100vw-240px)]">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Priority 3: Today's Events */}
              <TodayEvents />
              
              {/* Priority 4: Stats Grid */}
              <StatsGrid stats={stats} />
            </div>

            {/* Middle Column */}
            <div className="space-y-4">
              {/* Priority 5: Latest Posts */}
              <LatestPosts />
              
              {/* Priority 6: Community Highlights */}
              <CommunityHighlights />
            </div>

            {/* Right Column */}
            <div className="space-y-4">            
              {/* Priority 7: Marketplace */}
              <Bazaar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
