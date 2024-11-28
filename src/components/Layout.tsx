import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Search, Calendar, ShoppingBag, Vote } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useSearch } from '../lib/search';

const typeIcons = {
  event: Calendar,
  bazaar: ShoppingBag,
  decision: Vote
};

export default function Layout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { query, results, isSearching, setQuery } = useSearch();

  const handleResultClick = (link: string) => {
    navigate(link);
    setQuery('');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}