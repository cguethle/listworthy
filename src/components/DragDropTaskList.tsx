import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import { TaskRow } from './TaskRow';
import { useTaskStore } from '../stores/taskStore';

interface SortableTaskRowProps {
  task: Task;
}

const SortableTaskRow: React.FC<SortableTaskRowProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskRow task={task} isDragging={isDragging} />
    </div>
  );
};

interface DragDropTaskListProps {
  tasks: Task[];
  title: string;
  onTasksReorder: (tasks: Task[]) => void;
}

export const DragDropTaskList: React.FC<DragDropTaskListProps> = ({
  tasks,
  title,
  onTasksReorder,
}) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const { updateTask } = useTaskStore();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        
        // Update sort order for all tasks
        newTasks.forEach((task, index) => {
          updateTask(task.id, { sortOrder: index });
        });

        onTasksReorder(newTasks);
      }
    }

    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {tasks.map(task => (
            <SortableTaskRow key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeTask ? <TaskRow task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};