import React, { useState } from 'react';
import ActiveProposals from './components/ActiveProposals';
import VotingHistory from './components/VotingHistory';
import ProposalSubmission from './components/ProposalSubmission';
import DecisionTimeline from './components/DecisionTimeline';

export default function Decisions() {
  const [showSubmission, setShowSubmission] = useState(false);

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-primary">Decision Hub</h1>
          <button 
            onClick={() => setShowSubmission(true)}
            className="px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Submit New Proposal
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-6">
          <div className="lg:col-span-2">
            <ActiveProposals />
          </div>
          <DecisionTimeline />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {showSubmission ? (
            <ProposalSubmission />
          ) : (
            <VotingHistory />
          )}
          <VotingHistory />
        </div>
      </div>
    </div>
  );
}