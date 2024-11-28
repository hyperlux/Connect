import React from 'react';
import { Vote, Users, ArrowRight } from 'lucide-react';

const activeProposals = [
  {
    id: 1,
    title: 'Solar Panel Installation',
    category: 'Infrastructure',
    deadline: '2 days left',
    participation: 342,
    support: 85
  },
  {
    id: 2,
    title: 'New Community Garden',
    category: 'Agriculture',
    deadline: '5 days left',
    participation: 256,
    support: 92
  }
];

export default function DecisionHub() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vote className="h-5 w-5 text-auroville-primary" />
            <h2 className="font-semibold text-gray-900">Active Proposals</h2>
          </div>
          <button className="text-sm text-auroville-primary hover:underline">
            View All
          </button>
        </div>
      </div>

      <div className="divide-y">
        {activeProposals.map((proposal) => (
          <div key={proposal.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{proposal.title}</h3>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-auroville-light text-auroville-primary mt-1">
                  {proposal.category}
                </span>
              </div>
              <button className="text-auroville-primary hover:underline flex items-center gap-1">
                Participate <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3">
              <div className="bg-gray-100 rounded-full h-2 mb-2">
                <div 
                  className="bg-auroville-primary h-2 rounded-full"
                  style={{ width: `${proposal.support}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{proposal.participation} participated</span>
                </div>
                <span>{proposal.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}