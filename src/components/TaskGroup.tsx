import React, { useState } from 'react';
import { Task } from '../types';
import { TaskRow } from './TaskRow';

interface TaskGroupProps {
  title: string;
  tasks: Task[];
  count: number;
  onTasksReorder?: (tasks: Task[]) => void;
}

export const TaskGroup: React.FC<TaskGroupProps> = ({ 
  title, 
  tasks, 
  count, 
  onTasksReorder 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="mb-6">
      <button
        onClick={toggleCollapse}
        className="flex items-center justify-between w-full mb-3 text-left focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({count})
          </span>
        </h3>
        <svg 
          className={`w-5 h-5 text-gray-400 transform transition-transform ${
            isCollapsed ? '-rotate-90' : ''
          }`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>

      {!isCollapsed && (
        <div className="space-y-2">
          {tasks.map(task => (
            <TaskRow 
              key={task.id} 
              task={task}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tasks in this section
            </div>
          )}
        </div>
      )}
    </div>
  );
};