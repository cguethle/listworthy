# API Reference

## Type Definitions

### Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO 8601 string
  priority: 'Low' | 'Medium' | 'High';
  labels?: string[];
  repeat?: 'Never' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  completed: boolean;
  createdAt: string;
  sortOrder: number;
}
```

### Filter Options
```typescript
interface FilterOptions {
  priority?: 'Low' | 'Medium' | 'High';
  label?: string;
  dateRange?: 'Today' | 'Tomorrow' | 'This Week' | 'Next Week';
}
```

### Sort Options
```typescript
interface SortOptions {
  by: 'dueDate' | 'createdAt' | 'priority' | 'manual';
  direction: 'asc' | 'desc';
}
```

### View Mode
```typescript
type ViewMode = 'list' | 'calendar';
```

## Store API (Zustand)

### State Structure
```typescript
interface TaskState {
  tasks: Task[];
  filter: FilterOptions;
  sort: SortOptions;
  viewMode: ViewMode;
  selectedTask: Task | null;
  isTaskModalOpen: boolean;
}
```

### Actions

#### Task Management
```typescript
// Set all tasks
setTasks: (tasks: Task[]) => void;

// Add a new task
addTask: (task: Omit<Task, 'id' | 'createdAt' | 'sortOrder'>) => void;

// Update existing task
updateTask: (id: string, updates: Partial<Task>) => void;

// Delete task
deleteTask: (id: string) => void;

// Mark task as complete (handles repeating tasks)
completeTask: (id: string) => void;

// Reorder tasks within a section
reorderTasks: (taskId: string, newIndex: number, section: string) => void;
```

#### Filtering and Sorting
```typescript
// Set filter options
setFilter: (filter: FilterOptions) => void;

// Set sort options
setSort: (sort: SortOptions) => void;

// Clear all filters
clearFilter: () => void;
```

#### UI State
```typescript
// Toggle between list and calendar views
setViewMode: (mode: ViewMode) => void;

// Set currently selected task for editing
setSelectedTask: (task: Task | null) => void;

// Control task modal visibility
setTaskModalOpen: (open: boolean) => void;
```

#### Data Persistence
```typescript
// Load tasks from localStorage
loadFromStorage: () => void;

// Save tasks to localStorage
saveToStorage: () => void;
```

## Components

### App Component
Main application component that renders the entire interface.

**Props**: None

**Features**:
- Loads data from localStorage on mount
- Conditionally renders List or Calendar view
- Includes TaskModal for task editing

### Header Component
Application header with navigation and actions.

**Props**: None

**Features**:
- View mode toggle (List/Calendar)
- Add task button
- Application title

### TaskList Component
Main list view showing grouped tasks.

**Props**: None

**Features**:
- Groups tasks by due date
- Applies filtering and sorting
- Renders TaskGroup components

### TaskGroup Component
Collapsible section containing related tasks.

**Props**:
```typescript
interface TaskGroupProps {
  title: string;
  tasks: Task[];
  count: number;
  onTasksReorder?: (tasks: Task[]) => void;
}
```

**Features**:
- Collapsible/expandable sections
- Task count display
- Drag-and-drop support

### TaskRow Component
Individual task display and interaction.

**Props**:
```typescript
interface TaskRowProps {
  task: Task;
  isDragging?: boolean;
}
```

**Features**:
- Checkbox for completion
- Inline title editing
- Priority and due date pills
- Edit and delete actions
- Drag handle for reordering

### TaskModal Component
Full-featured task creation and editing modal.

**Props**: None (uses store state)

**Features**:
- Create new tasks
- Edit existing tasks
- Form validation
- All task properties

### Calendar Component
Monthly calendar view showing tasks by date.

**Props**: None

**Features**:
- Month navigation
- Task display by due date
- Click to edit tasks
- Priority-based color coding

### QuickAddTask Component
Simple task creation input.

**Props**: None

**Features**:
- Quick task creation
- Default priority (Medium)
- Enter key submission

### FilterControls Component
Filtering and sorting interface.

**Props**: None

**Features**:
- Priority filtering
- Date range filtering
- Sort options
- Clear filters button

### DragDropTaskList Component
Drag-and-drop enabled task list.

**Props**:
```typescript
interface DragDropTaskListProps {
  tasks: Task[];
  title: string;
  onTasksReorder: (tasks: Task[]) => void;
}
```

**Features**:
- Drag-and-drop reordering
- Visual feedback during drag
- Automatic sort order updates

## Utility Functions

### Date Utilities (`dateUtils.ts`)
```typescript
// Check if date is overdue
isOverdue: (dateString: string) => boolean;

// Get color class for due date
getDueDateColor: (dueDate?: string) => string;

// Format due date for display
formatDueDate: (dueDate?: string) => string;

// Calculate next repeat date
getNextRepeatDate: (dueDate: string, repeat: string) => string;

// Group tasks by due date categories
groupTasksByDueDate: (tasks: Task[]) => {
  today: Task[];
  upcoming: Task[];
  overdue: Task[];
  noDueDate: Task[];
};
```

### Storage Utilities (`storage.ts`)
```typescript
// Load tasks from localStorage
loadTasks: () => Task[];

// Save tasks to localStorage
saveTasks: (tasks: Task[]) => void;

// Generate unique task ID
generateId: () => string;
```

## Error Handling

### Storage Errors
- localStorage quota exceeded
- JSON parsing errors
- Fallback to empty array

### Validation
- Required fields validation
- Date format validation
- Priority value validation

## Performance Optimizations

### Memoization
- Expensive computations are memoized
- Filtered and sorted task lists cached
- Calendar date calculations optimized

### Efficient Updates
- Immutable state updates
- Minimal re-renders
- Selective component updates

## Browser Support

### localStorage
- Automatic fallback for unsupported browsers
- Graceful degradation without data persistence

### Drag and Drop
- Touch device support
- Keyboard accessibility
- Fallback for unsupported browsers