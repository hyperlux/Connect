import React, { useState, useEffect } from 'react';
import { useCalendar } from '../../lib/calendar';
import Calendar from './components/Calendar';
import EventCard from './components/EventCard';
import EventForm from './components/EventForm';
import EventFilters from './components/EventFilters';
import { useTheme } from '../../lib/theme';
import { useAuth } from '../../lib/auth';
import { Search, Plus } from 'lucide-react';
import { startOfWeek, endOfWeek, isSameDay, isWithinInterval, format, parseISO } from 'date-fns';

export default function Events() {
  const [showEventForm, setShowEventForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingEvent, setEditingEvent] = useState<null | any>(null);
  const { 
    events, 
    selectedDate, 
    viewMode,
    isLoading, 
    error, 
    fetchEvents, 
    joinEvent, 
    leaveEvent,
    setViewMode,
    createEvent,
    updateEvent,
    deleteEvent
  } = useCalendar();
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateSelect = (date: Date) => {
    setViewMode('day');
    fetchEvents(date.getMonth() + 1, date.getFullYear());
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSidebarSearch = (value: string) => {
    setSidebarSearchQuery(value);
  };

  const handleCreateEvent = async (data: any) => {
    try {
      await createEvent({
        ...data,
        organizerId: user?.id,
        organizer: {
          id: user?.id || '',
          name: user?.name || ''
        }
      });
      setShowEventForm(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleEditEvent = async (data: any) => {
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, data);
        setShowEventForm(false);
        setEditingEvent(null);
      }
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleEdit = (event: any) => {
    if (user?.id === event.organizerId) {
      setEditingEvent(event);
      setShowEventForm(true);
    } else {
      console.log('You can only edit your own events');
      alert('You can only edit events that you have created');
    }
  };

  const handleJoin = async (event: any) => {
    try {
      if (event.isJoined) {
        await leaveEvent(event.id);
      } else {
        await joinEvent(event.id);
      }
    } catch (error) {
      console.error('Failed to join/leave event:', error);
    }
  };

  const handleCloseForm = () => {
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleDelete = async (event: any) => {
    try {
      if (user?.id === event.organizerId) {
        await deleteEvent(event.id);
        // Refresh events list after deletion
        await fetchEvents();
      } else {
        console.log('You can only delete your own events');
        alert('You can only delete events that you have created');
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  // Filter events based on view mode and search
  const getFilteredEvents = () => {
    // First apply date filtering
    let filteredEvents = events;
    
    if (viewMode === 'day') {
      filteredEvents = events.filter(event => 
        isSameDay(parseISO(event.date), selectedDate)
      );
    } else if (viewMode === 'week') {
      const weekStart = startOfWeek(selectedDate);
      const weekEnd = endOfWeek(selectedDate);
      filteredEvents = events.filter(event => 
        isWithinInterval(parseISO(event.date), { start: weekStart, end: weekEnd })
      );
    }

    // Then apply search and category filtering
    const mainSearch = searchQuery.trim().toLowerCase();
    const sideSearch = sidebarSearchQuery.trim().toLowerCase();
    const hasSearch = mainSearch !== '' || sideSearch !== '' || selectedCategory !== 'all';

    if (hasSearch) {
      filteredEvents = filteredEvents.filter(event => {
        // Search filtering
        const eventText = (
          event.title.toLowerCase() + ' ' +
          event.description.toLowerCase() + ' ' +
          event.location.toLowerCase() + ' ' +
          event.category.toLowerCase()
        );

        const matchesMainSearch = mainSearch === '' || eventText.includes(mainSearch);
        const matchesSideSearch = sideSearch === '' || eventText.includes(sideSearch);
        const matchesCategory = selectedCategory === 'all' || 
          event.category.toLowerCase() === selectedCategory.toLowerCase();

        return matchesMainSearch && matchesSideSearch && matchesCategory;
      });
    }

    return filteredEvents;
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
      isDark ? 'text-dark-primary' : 'text-gray-900'
    }`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Community Events</h1>
        <button
          onClick={() => setShowEventForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1 space-y-6">
          <Calendar onSelectDate={handleDateSelect} />
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">View Options</h3>
            <div className="flex flex-col gap-2">
              {(['day', 'week', 'month'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewMode === mode
                      ? 'bg-auroville-primary text-white'
                      : 'bg-gray-100 dark:bg-dark-hover text-gray-700 dark:text-dark-secondary hover:bg-gray-200 dark:hover:bg-opacity-80'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} View
                </button>
              ))}
            </div>
          </div>
          <EventFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={sidebarSearchQuery}
            onSearchChange={handleSidebarSearch}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {viewMode === 'day' && format(selectedDate, 'MMMM d, yyyy')}
                {viewMode === 'week' && `Week of ${format(startOfWeek(selectedDate), 'MMMM d')}`}
                {viewMode === 'month' && format(selectedDate, 'MMMM yyyy')}
              </h2>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearch}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-dark-card border-dark text-dark-primary placeholder-dark-secondary'
                    : 'bg-white border-gray-300 text-gray-900'
                } border focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
              />
              <Search className={`absolute left-3 top-2.5 h-5 w-5 ${
                isDark ? 'text-dark-secondary' : 'text-gray-400'
              }`} />
            </div>
          </div>

          {isLoading ? (
            <div className={`text-center py-8 ${
              isDark ? 'text-dark-secondary' : 'text-gray-500'
            }`}>
              Loading events...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              {error}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className={`text-center py-8 ${
              isDark ? 'text-dark-secondary' : 'text-gray-500'
            }`}>
              No events found for the selected criteria.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  isDark={isDark}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onJoin={handleJoin}
                  isOrganizer={user?.id === event.organizerId}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showEventForm && (
        <EventForm
          onClose={handleCloseForm}
          onSubmit={editingEvent ? handleEditEvent : handleCreateEvent}
          isDark={isDark}
          initialData={editingEvent}
        />
      )}
    </div>
  );
}