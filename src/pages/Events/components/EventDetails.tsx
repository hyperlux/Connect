import { Clock, Users } from 'lucide-react';
import { format, parse } from 'date-fns';

export interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm format
  endTime: string; // HH:mm format
  attendees: number;
  maxSpots: number;
  description?: string;
  location?: string;
}

interface EventDetailsProps {
  event?: Event;
}

export default function EventDetails({ event }: EventDetailsProps) {
  if (!event) return null;

  const formatTimeString = (timeStr: string) => {
    try {
      const time = parse(timeStr, 'HH:mm', new Date());
      return format(time, 'h:mm a');
    } catch (error) {
      console.error('Error parsing time:', error);
      return timeStr;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span className="text-gray-600 dark:text-gray-300">
          {formatTimeString(event.time)} - {formatTimeString(event.endTime)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {event.attendees} participants
          </span>
        </div>
        {event.maxSpots > event.attendees && (
          <span className="text-gray-500 dark:text-gray-400 ml-7">
            {event.maxSpots - event.attendees} spots left
          </span>
        )}
      </div>
    </div>
  );
} 