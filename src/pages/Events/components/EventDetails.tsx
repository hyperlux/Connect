import { Clock, MapPin, Tag, Users, Edit } from 'lucide-react';
// ... existing code ...
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  {format(new Date(`${event.date}T${event.time}`), 'h:mm a')} - 
                  {format(new Date(`${event.date}T${event.endTime}`), 'h:mm a')}
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
// ... existing code ... 