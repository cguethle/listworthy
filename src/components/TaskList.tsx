import React, { useMemo } from 'react';
import { useTaskStore } from '../stores/taskStore';
import { TaskGroup } from './TaskGroup';
import { groupTasksByDueDate } from '../utils/dateUtils';
import { Task } from '../types';

export const TaskList: React.FC = () => {
  const { tasks, filter, sort } = useTaskStore();

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => !task.completed);

    // Apply filters
    if (filter.priority) {
      filtered = filtered.filter(task => task.priority === filter.priority);
    }

    if (filter.label) {
      filtered = filtered.filter(task => 
        task.labels?.includes(filter.label!)
      );
    }

    if (filter.dateRange) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      switch (filter.dateRange) {
        case 'Today':
          filtered = filtered.filter(task => {
            if (!task.dueDate) return false;
            const taskDate = new Date(task.dueDate);
            return taskDate.toDateString() === today.toDateString();
          });
          break;
        case 'Tomorrow':
          filtered = filtered.filter(task => {
            if (!task.dueDate) return false;
            const taskDate = new Date(task.dueDate);
            return taskDate.toDateString() === tomorrow.toDateString();
          });
          break;
        // Add more date range filters as needed
      }
    }

    // Apply sorting
    switch (sort.by) {
      case 'dueDate':
        filtered.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          const comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          return sort.direction === 'asc' ? comparison : -comparison;
        });
        break;
      case 'priority':
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        filtered.sort((a, b) => {
          const comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          return sort.direction === 'asc' ? comparison : -comparison;
        });
        break;
      case 'createdAt':
        filtered.sort((a, b) => {
          const comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          return sort.direction === 'asc' ? comparison : -comparison;
        });
        break;
      case 'manual':
      default:
        filtered.sort((a, b) => {
          const comparison = a.sortOrder - b.sortOrder;
          return sort.direction === 'asc' ? comparison : -comparison;
        });
        break;
    }

    return filtered;
  }, [tasks, filter, sort]);

  const groupedTasks = useMemo(() => {
    return groupTasksByDueDate(filteredAndSortedTasks);
  }, [filteredAndSortedTasks]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <TaskGroup 
        title="Overdue" 
        tasks={groupedTasks.overdue} 
        count={groupedTasks.overdue.length}
      />
      
      <TaskGroup 
        title="Today" 
        tasks={groupedTasks.today} 
        count={groupedTasks.today.length}
      />
      
      <TaskGroup 
        title="Upcoming" 
        tasks={groupedTasks.upcoming} 
        count={groupedTasks.upcoming.length}
      />
      
      <TaskGroup 
        title="No Due Date" 
        tasks={groupedTasks.noDueDate} 
        count={groupedTasks.noDueDate.length}
      />
    </div>
  );
};