import React, { useEffect } from 'react';
import { useTaskStore } from './stores/taskStore';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { Calendar } from './components/Calendar';
import { TaskModal } from './components/TaskModal';
import { QuickAddTask } from './components/QuickAddTask';
import { FilterControls } from './components/FilterControls';

function App() {
  const { viewMode, loadFromStorage } = useTaskStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {viewMode === 'list' ? (
          <>
            <QuickAddTask />
            <FilterControls />
            <TaskList />
          </>
        ) : (
          <Calendar />
        )}
      </main>

      <TaskModal />
    </div>
  );
}

export default App;