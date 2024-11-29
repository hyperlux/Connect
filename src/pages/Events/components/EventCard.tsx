import React from 'react';
import { Calendar, MapPin, Users, Clock, Tag, Edit2, Share2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { CalendarEvent } from '../../../lib/calendar';

interface EventCardProps {
  event: CalendarEvent;
  isDark: boolean;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
  onJoin?: (event: CalendarEvent) => void;
  isOrganizer?: boolean;
}

export default function EventCard({ event, isDark, onEdit, onDelete, onJoin, isOrganizer }: EventCardProps) {
  const navigate = useNavigate();

  console.log({
    isOrganizer,
    eventOrganizerId: event.organizerId,
  });

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoin?.(event);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(event);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete?.(event);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`${
        isDark ? 'bg-dark-card' : 'bg-white'
      } rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow`}
    >
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        {isOrganizer && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleEdit}
              className={`p-2 rounded-full ${
                isDark ? 'bg-dark-card' : 'bg-white'
              } shadow-md hover:bg-opacity-90 transition-colors`}
            >
              <Edit2 className={`h-4 w-4 ${
                isDark ? 'text-dark-primary' : 'text-gray-700'
              }`} />
            </button>
            <button
              onClick={handleDelete}
              className={`p-2 rounded-full ${
                isDark ? 'bg-dark-card' : 'bg-white'
              } shadow-md hover:bg-opacity-90 transition-colors`}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="h-4 w-4 text-auroville-primary" />
          <span className="text-sm text-auroville-primary">{event.category}</span>
        </div>

        <h3 className={`text-xl font-semibold mb-2 ${
          isDark ? 'text-dark-primary' : 'text-gray-900'
        }`}>
          {event.title}
        </h3>
        
        <p className={`mb-4 line-clamp-2 ${
          isDark ? 'text-dark-secondary' : 'text-gray-600'
        }`}>
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className={`flex items-center ${
            isDark ? 'text-dark-secondary' : 'text-gray-600'
          }`}>
            <Calendar className="h-5 w-5 mr-2" />
            <span>{format(new Date(event.date), 'PPP')}</span>
          </div>
          <div className={`flex items-center ${
            isDark ? 'text-dark-secondary' : 'text-gray-600'
          }`}>
            <Clock className="h-5 w-5 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className={`flex items-center ${
            isDark ? 'text-dark-secondary' : 'text-gray-600'
          }`}>
            <MapPin className="h-5 w-5 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {event.attendees} participants
              </span>
            </div>
            {event.maxSpots > event.attendees && (
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-7">
                {event.maxSpots - event.attendees} spots left
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleJoin}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              event.isJoined
                ? isDark
                  ? 'bg-dark-lighter text-dark-primary hover:bg-dark'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-auroville-primary text-white hover:bg-opacity-90'
            }`}
          >
            {event.isJoined ? 'Leave Event' : 'Join Event'}
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Handle share functionality
            }}
            className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
              isDark
                ? 'border-dark text-dark-primary hover:bg-dark-lighter'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}