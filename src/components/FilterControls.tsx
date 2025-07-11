import React from 'react';
import { useTaskStore } from '../stores/taskStore';
import { FilterOptions, SortOptions } from '../types';

export const FilterControls: React.FC = () => {
  const { filter, sort, setFilter, setSort, clearFilter } = useTaskStore();

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilter({
      ...filter,
      [key]: value === 'all' ? undefined : value,
    });
  };

  const handleSortChange = (by: SortOptions['by']) => {
    setSort({
      by,
      direction: sort.by === by && sort.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const hasActiveFilters = Object.values(filter).some(value => value !== undefined);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Priority:</label>
          <select
            value={filter.priority || 'all'}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Due:</label>
          <select
            value={filter.dateRange || 'all'}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="This Week">This Week</option>
            <option value="Next Week">Next Week</option>
          </select>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <div className="flex gap-1">
            <button
              onClick={() => handleSortChange('dueDate')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sort.by === 'dueDate'
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Due Date
              {sort.by === 'dueDate' && (
                <span className="ml-1">
                  {sort.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
            <button
              onClick={() => handleSortChange('priority')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sort.by === 'priority'
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Priority
              {sort.by === 'priority' && (
                <span className="ml-1">
                  {sort.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
            <button
              onClick={() => handleSortChange('createdAt')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sort.by === 'createdAt'
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Created
              {sort.by === 'createdAt' && (
                <span className="ml-1">
                  {sort.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
            <button
              onClick={() => handleSortChange('manual')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sort.by === 'manual'
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manual
              {sort.by === 'manual' && (
                <span className="ml-1">
                  {sort.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilter}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};