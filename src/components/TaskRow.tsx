import React, { useState } from 'react';
import { Task } from '../types';
import { formatDueDate, getDueDateColor } from '../utils/dateUtils';
import { useTaskStore } from '../stores/taskStore';

interface TaskRowProps {
  task: Task;
  isDragging?: boolean;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task, isDragging = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const { updateTask, completeTask, deleteTask, setSelectedTask, setTaskModalOpen } = useTaskStore();

  const handleComplete = () => {
    completeTask(task.id);
  };

  const handleTitleEdit = () => {
    if (isEditing) {
      updateTask(task.id, { title: editTitle });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleTaskClick = () => {
    setSelectedTask(task);
    setTaskModalOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-priority-high text-white';
      case 'Medium': return 'bg-priority-medium text-white';
      case 'Low': return 'bg-priority-low text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getDueDatePillColor = (dueDate?: string) => {
    const colorClass = getDueDateColor(dueDate);
    switch (colorClass) {
      case 'due-overdue': return 'bg-red-100 text-red-800';
      case 'due-today': return 'bg-orange-100 text-orange-800';
      case 'due-upcoming': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div 
      className={`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {/* Drag handle */}
      <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM6 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" />
        </svg>
      </div>

      {/* Checkbox */}
      <button
        onClick={handleComplete}
        className="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {task.completed && (
          <svg className="w-full h-full text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Task title */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleEdit}
            onKeyDown={handleTitleKeyPress}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <button
            onClick={handleTaskClick}
            className="text-left w-full truncate hover:text-blue-600 focus:outline-none focus:text-blue-600"
          >
            {task.title}
          </button>
        )}
      </div>

      {/* Due date pill */}
      {task.dueDate && (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDueDatePillColor(task.dueDate)}`}>
          {formatDueDate(task.dueDate)}
        </span>
      )}

      {/* Priority pill */}
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
        {task.priority}
      </span>

      {/* Edit button */}
      <button
        onClick={handleTitleEdit}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>

      {/* Delete button */}
      <button
        onClick={() => deleteTask(task.id)}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 focus:outline-none focus:text-red-600"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};