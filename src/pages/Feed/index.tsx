import React from 'react';
import WelcomeBanner from './components/WelcomeBanner';
import TodayEvents from './components/TodayEvents';
import CriticalAnnouncements from './components/CriticalAnnouncements';
import DecisionHub from './components/DecisionHub';
import SustainabilityUpdates from './components/SustainabilityUpdates';
import VolunteerSpotlight from './components/VolunteerSpotlight';
import CulturalHighlights from '../components/CulturalHighlights';
import CommunityStories from '../components/CommunityStories';
import MarketUpdates from '../components/MarketUpdates';
import PersonalizedContent from '../components/PersonalizedContent';

export default function Feed() {
  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Priority 1: Welcome & Orientation */}
        <WelcomeBanner />

        {/* Priority 2: Current Events & Announcements */}
        <TodayEvents />

        {/* Priority 3: Critical Community Information */}
        <CriticalAnnouncements />

        {/* Priority 4: Decision Making & Participation */}
        <DecisionHub />

        {/* Priority 5: Sustainability Updates */}
        <SustainabilityUpdates />

        {/* Priority 6: Volunteer Opportunities */}
        <VolunteerSpotlight />

        {/* Priority 7: Cultural & Educational Highlights */}
        <CulturalHighlights />

        {/* Priority 8: Community Stories */}
        <CommunityStories />

        {/* Priority 9: Local Exchange & Marketplace */}
        <MarketUpdates />

        {/* Priority 10: Personalized Recommendations */}
        <PersonalizedContent />
      </div>
    </div>
  );
}