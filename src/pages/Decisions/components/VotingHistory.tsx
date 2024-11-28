import { Vote, Users, Calendar } from 'lucide-react';

const votingHistory = [
  {
    id: 1,
    title: 'Sustainable Energy Policy',
    category: 'Policy',
    date: '2024-02-15',
    participation: 456,
    result: 'passed',
    support: 89
  },
  {
    id: 2,
    title: 'Cultural Zone Development',
    category: 'Infrastructure',
    date: '2024-02-01',
    participation: 389,
    result: 'passed',
    support: 92
  },
  {
    id: 3,
    title: 'New Education Initiative',
    category: 'Education',
    date: '2024-01-20',
    participation: 412,
    result: 'rejected',
    support: 45
  }
];

export default function VotingHistory() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 dark:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Vote className="h-5 w-5 text-auroville-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">Participation History</h2>
        </div>
        <button className="text-sm text-auroville-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {votingHistory.map((vote) => (
          <div 
            key={vote.id}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-dark-primary">{vote.title}</h3>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-auroville-light dark:bg-auroville-primary/20 text-auroville-primary mt-1">
                  {vote.category}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                vote.result === 'passed' 
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
              }`}>
                {vote.result.charAt(0).toUpperCase() + vote.result.slice(1)}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-dark-secondary">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(vote.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{vote.participation} participated</span>
              </div>
              <div className="font-medium">
                {vote.support}% support
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}