import { useNavigate } from 'react-router-dom';
import { Calendar, Building2, MessageSquare, FileText, ShoppingBag, X } from 'lucide-react';
import type { SearchResult } from '../lib/search';

interface SearchResultsProps {
  results: SearchResult[];
  isSearching: boolean;
  onClose: () => void;
}

const typeIcons: Record<SearchResult['type'], React.ComponentType<any>> = {
  event: Calendar,
  service: Building2,
  forum: MessageSquare,
  resource: FileText,
  bazaar: ShoppingBag
};

export default function SearchResults({ results, isSearching, onClose }: SearchResultsProps) {
  const navigate = useNavigate();

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Search Results</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      {isSearching ? (
        <div className="p-4 text-center text-gray-500">
          Searching...
        </div>
      ) : results.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No results found
        </div>
      ) : (
        <div className="divide-y">
          {results.map((result) => {
            const Icon = typeIcons[result.type];
            return (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full p-4 text-left hover:bg-gray-50 flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-gray-100">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{result.title}</h4>
                  <p className="text-sm text-gray-500">{result.description}</p>
                  <span className="text-xs text-auroville-primary mt-1 inline-block capitalize">
                    {result.type}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}