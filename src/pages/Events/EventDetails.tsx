import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCalendarStore from '../../lib/calendar';
import { useTheme } from '../../lib/theme';
import { useAuth } from '../../lib/auth';
import { Calendar, MapPin, Users, Clock, Tag, ArrowLeft, MessageSquare, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import EventForm from './components/EventForm';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Event Details Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <button
              onClick={() => window.location.href = '/events'}
              className="text-auroville-primary hover:underline"
            >
              Back to Events
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, joinEvent, leaveEvent, addComment } = useCalendarStore();
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const [comment, setComment] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);

  const event = events.find(e => e.id === eventId);
  const isOrganizer = user?.id === event?.organizerId;

  if (!event) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Event not found</h2>
          <button
            onClick={() => navigate('/events')}
            className="text-auroville-primary hover:underline"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleJoinLeave = async () => {
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

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addComment(event.id, comment);
      setComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleEdit = () => {
    setShowEventForm(true);
  };

  const handleEditSubmit = async (data: any) => {
    try {
      await useCalendarStore.getState().updateEvent(event.id, data);
      setShowEventForm(false);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  return (
    <ErrorBoundary>
      <div className={`flex-1 ${isDark ? 'bg-dark' : 'bg-gray-50'} p-6 overflow-auto`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate('/events')}
              className={`flex items-center gap-2 ${
                isDark ? 'text-dark-primary hover:text-dark-secondary' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Events
            </button>
            {isOrganizer && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit Event</span>
              </button>
            )}
          </div>

          <div className={`${
            isDark ? 'bg-dark-card' : 'bg-white'
          } rounded-xl shadow-sm overflow-hidden`}>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover"
            />
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5 text-auroville-primary" />
                <span className="text-sm text-auroville-primary">{event.category}</span>
              </div>

              <h1 className={`text-3xl font-bold mb-4 ${
                isDark ? 'text-dark-primary' : 'text-gray-900'
              }`}>
                {event.title}
              </h1>

              <p className={`mb-6 text-lg ${
                isDark ? 'text-dark-secondary' : 'text-gray-600'
              }`}>
                {event.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className={`flex items-center ${
                    isDark ? 'text-dark-secondary' : 'text-gray-600'
                  }`}>
                    <Calendar className="h-5 w-5 mr-3" />
                    <span>{format(new Date(event.date), 'PPP')}</span>
                  </div>
                  <div className={`flex items-center ${
                    isDark ? 'text-dark-secondary' : 'text-gray-600'
                  }`}>
                    <Clock className="h-5 w-5 mr-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className={`flex items-center ${
                    isDark ? 'text-dark-secondary' : 'text-gray-600'
                  }`}>
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className={`flex items-center ${
                    isDark ? 'text-dark-secondary' : 'text-gray-600'
                  }`}>
                    <Users className="h-5 w-5 mr-3" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  isDark ? 'bg-dark-lighter' : 'bg-gray-50'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    isDark ? 'text-dark-primary' : 'text-gray-900'
                  }`}>
                    Organized by
                  </h3>
                  <p className={isDark ? 'text-dark-secondary' : 'text-gray-600'}>
                    {event.organizer?.name}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleJoinLeave}
                  className={`flex-1 px-6 py-3 rounded-lg transition-colors ${
                    event.isJoined
                      ? isDark
                        ? 'bg-dark-lighter text-dark-primary hover:bg-dark'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-auroville-primary text-white hover:bg-opacity-90'
                  }`}
                >
                  {event.isJoined ? 'Leave Event' : 'Join Event'}
                </button>
              </div>
            </div>
          </div>

          <div className={`mt-8 ${
            isDark ? 'bg-dark-card' : 'bg-white'
          } rounded-xl shadow-sm p-6`}>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5 text-auroville-primary" />
              <h2 className={`font-semibold ${
                isDark ? 'text-dark-primary' : 'text-gray-900'
              }`}>
                Comments
              </h2>
            </div>

            <form onSubmit={handleComment} className="mb-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className={`flex-1 rounded-lg px-4 py-2 ${
                    isDark
                      ? 'bg-dark-lighter border-dark text-dark-primary placeholder-dark-secondary'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Post
                </button>
              </div>
            </form>

            <div className="space-y-6">
              {event.comments?.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg ${
                    isDark ? 'bg-dark-lighter' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-medium ${
                      isDark ? 'text-dark-primary' : 'text-gray-900'
                    }`}>
                      {comment.author.name}
                    </span>
                    <span className={`text-sm ${
                      isDark ? 'text-dark-secondary' : 'text-gray-500'
                    }`}>
                      {format(new Date(comment.createdAt), 'PPp')}
                    </span>
                  </div>
                  <div className={isDark ? 'text-dark-secondary' : 'text-gray-600'}>
                    {comment.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showEventForm && (
          <EventForm
            onClose={() => setShowEventForm(false)}
            onSubmit={handleEditSubmit}
            isDark={isDark}
            initialData={event}
          />
        )}
      </div>
    </ErrorBoundary>
  );
} 