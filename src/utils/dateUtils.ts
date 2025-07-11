import { 
  isToday, 
  isTomorrow, 
  isPast, 
  isThisWeek, 
  isNextWeek, 
  addDays, 
  addWeeks, 
  addMonths, 
  addYears, 
  format, 
  startOfDay,
  parseISO 
} from 'date-fns';

export const isOverdue = (dateString: string): boolean => {
  const date = parseISO(dateString);
  return isPast(date) && !isToday(date);
};

export const getDueDateColor = (dueDate?: string): string => {
  if (!dueDate) return 'due-none';
  
  const date = parseISO(dueDate);
  if (isOverdue(dueDate)) return 'due-overdue';
  if (isToday(date)) return 'due-today';
  return 'due-upcoming';
};

export const formatDueDate = (dueDate?: string): string => {
  if (!dueDate) return 'No due date';
  
  const date = parseISO(dueDate);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isOverdue(dueDate)) return format(date, 'MMM d') + ' (overdue)';
  return format(date, 'MMM d');
};

export const getNextRepeatDate = (dueDate: string, repeat: string): string => {
  const date = parseISO(dueDate);
  
  switch (repeat) {
    case 'Daily':
      return addDays(date, 1).toISOString();
    case 'Weekly':
      return addWeeks(date, 1).toISOString();
    case 'Monthly':
      return addMonths(date, 1).toISOString();
    case 'Yearly':
      return addYears(date, 1).toISOString();
    default:
      return dueDate;
  }
};

export const groupTasksByDueDate = (tasks: Task[]) => {
  const today: Task[] = [];
  const upcoming: Task[] = [];
  const overdue: Task[] = [];
  const noDueDate: Task[] = [];

  tasks.forEach(task => {
    if (!task.dueDate) {
      noDueDate.push(task);
    } else {
      const date = parseISO(task.dueDate);
      if (isOverdue(task.dueDate)) {
        overdue.push(task);
      } else if (isToday(date)) {
        today.push(task);
      } else {
        upcoming.push(task);
      }
    }
  });

  return { today, upcoming, overdue, noDueDate };
};