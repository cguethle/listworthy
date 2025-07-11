import { create } from 'zustand';
import { Task, FilterOptions, SortOptions, ViewMode } from '../types';
import { loadTasks, saveTasks, generateId } from '../utils/storage';
import { getNextRepeatDate } from '../utils/dateUtils';

interface TaskState {
  tasks: Task[];
  filter: FilterOptions;
  sort: SortOptions;
  viewMode: ViewMode;
  selectedTask: Task | null;
  isTaskModalOpen: boolean;
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'sortOrder'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  reorderTasks: (taskId: string, newIndex: number, section: string) => void;
  
  // Filtering and sorting
  setFilter: (filter: FilterOptions) => void;
  setSort: (sort: SortOptions) => void;
  clearFilter: () => void;
  
  // UI state
  setViewMode: (mode: ViewMode) => void;
  setSelectedTask: (task: Task | null) => void;
  setTaskModalOpen: (open: boolean) => void;
  
  // Persistence
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filter: {},
  sort: { by: 'manual', direction: 'asc' },
  viewMode: 'list',
  selectedTask: null,
  isTaskModalOpen: false,

  setTasks: (tasks) => {
    set({ tasks });
    saveTasks(tasks);
  },

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      sortOrder: get().tasks.length,
    };
    
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    saveTasks(updatedTasks);
  },

  updateTask: (id, updates) => {
    const updatedTasks = get().tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    set({ tasks: updatedTasks });
    saveTasks(updatedTasks);
  },

  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter(task => task.id !== id);
    set({ tasks: updatedTasks });
    saveTasks(updatedTasks);
  },

  completeTask: (id) => {
    const task = get().tasks.find(t => t.id === id);
    if (!task) return;

    let updatedTasks = get().tasks.filter(t => t.id !== id);

    if (task.repeat && task.repeat !== 'Never' && task.dueDate) {
      const newTask: Task = {
        ...task,
        id: generateId(),
        completed: false,
        dueDate: getNextRepeatDate(task.dueDate, task.repeat),
        createdAt: new Date().toISOString(),
      };
      updatedTasks = [...updatedTasks, newTask];
    }

    set({ tasks: updatedTasks });
    saveTasks(updatedTasks);
  },

  reorderTasks: (taskId, newIndex, section) => {
    const tasks = get().tasks;
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(taskIndex, 1);
    updatedTasks.splice(newIndex, 0, movedTask);

    updatedTasks.forEach((task, index) => {
      task.sortOrder = index;
    });

    set({ tasks: updatedTasks });
    saveTasks(updatedTasks);
  },

  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  clearFilter: () => set({ filter: {} }),

  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setTaskModalOpen: (open) => set({ isTaskModalOpen: open }),

  loadFromStorage: () => {
    const tasks = loadTasks();
    set({ tasks });
  },

  saveToStorage: () => {
    saveTasks(get().tasks);
  },
}));