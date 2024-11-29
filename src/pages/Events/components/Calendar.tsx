import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  parseISO,
  getDay,
  isValid
} from 'date-fns';
import { useCalendar, type CalendarEvent } from '../../../lib/calendar';

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

export default function Calendar({ onSelectDate }: CalendarProps) {
  const { selectedDate, events, setSelectedDate } = useCalendar();

  // Get the first day of the current month
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  
  // Get days in current month
  const currentMonthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Calculate blank spaces for start of month
  const startDay = getDay(monthStart);
  const blankSpaces = Array.from({ length: startDay }, () => null);
  
  // Combine all days
  const calendarDays = [...blankSpaces, ...currentMonthDays];

  const getEventsForDate = (date: Date | null): CalendarEvent[] => {
    if (!date || !isValid(date)) return [];
    return events.filter(event => {
      const eventDate = parseISO(event.date);
      return isValid(eventDate) && isSameDay(eventDate, date);
    });
  };

  const previousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handleDateClick = (day: Date | null) => {
    if (!day || !isValid(day)) return;
    setSelectedDate(day);
    onSelectDate(day);
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-dark-secondary" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-dark-secondary" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-dark-secondary py-2"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={`blank-${index}`} className="aspect-square" />;
          }

          const dayEvents = getEventsForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, selectedDate);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              className={`
                aspect-square p-2 rounded-lg relative
                ${isCurrentMonth ? 'text-gray-900 dark:text-dark-primary' : 'text-gray-400 dark:text-dark-secondary'}
                ${isSelected 
                  ? 'bg-auroville-primary text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-dark-hover'
                }
              `}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              {dayEvents.length > 0 && (
                <span className={`
                  absolute bottom-1 right-1 w-2 h-2 rounded-full
                  ${isSelected ? 'bg-white' : 'bg-auroville-primary'}
                `} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}