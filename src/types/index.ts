export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'Low' | 'Medium' | 'High';
  labels?: string[];
  repeat?: 'Never' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  completed: boolean;
  createdAt: string;
  sortOrder: number;
}

export interface TaskGroup {
  title: string;
  tasks: Task[];
  isCollapsed?: boolean;
}

export interface FilterOptions {
  priority?: 'Low' | 'Medium' | 'High';
  label?: string;
  dateRange?: 'Today' | 'Tomorrow' | 'This Week' | 'Next Week';
}

export interface SortOptions {
  by: 'dueDate' | 'createdAt' | 'priority' | 'manual';
  direction: 'asc' | 'desc';
}

export type ViewMode = 'list' | 'calendar';