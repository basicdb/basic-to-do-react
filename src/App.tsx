import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Task from '@/components/Task';
import Input from '@/components/Input';
import { useBasic, useQuery } from '@basictech/react'

const generateRandomId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 12 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};

export default function Home() {
  const { db } = useBasic()
  const todos = useQuery(db.collection('todos').getAll())
  const [searchParams, setSearchParams] = useSearchParams();

  const [isInputHovered, setIsInputHovered] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const currentView = searchParams.get('view') || 'all-tasks';

  const getFilteredTasks = useCallback(() => {
    if (!todos) return [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    switch (currentView) {
      case 'all-tasks':
        return todos;
      case 'Completed':
        return todos.filter((task: any) => task.completed);
      case 'Delayed':
        return todos.filter((task: any) =>
          !task.completed && task.date && new Date(task.date) < now
        );
      case 'Scheduled':
        return todos.filter((task: any) =>
          !task.completed && task.date && new Date(task.date) >= now
        );
      default:
        return todos.filter((task: any) => task.tags.includes(currentView));
    }
  }, [todos, currentView]);

  const filteredTasks = getFilteredTasks();

  const handleDelete = (id: string) => {
    db.collection('todos').delete(id);
  };

  const handleUpdate = (id: string, field: 'title' | 'date', value: string | Date | null) => {
    db.collection('todos').update(id, { [field]: value });
  };

  const handleToggleCompleted = (id: string) => {
    const task = todos?.find((t: any) => t.id === id);
    if (task) {
      db.collection('todos').update(id, { completed: !task.completed });
    }
  };

  const handleAddTask = () => {
    if (title.trim()) {
      const newTask = {
        id: generateRandomId(),
        title,
        date: date || null,
        completed: false,
        tags: !['all-tasks', 'completed', 'delayed', 'scheduled'].includes(currentView)
          ? [currentView]
          : []
      };
      db.collection('todos').add(newTask);
      setTitle('');
      setDate(null);
    }
  };

  useEffect(() => {
    const handleURLChange = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handleURLChange);
    return () => window.removeEventListener('popstate', handleURLChange);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[300px]">
        <div className="pt-28 bg-[#242424]/95 sticky top-0 z-50 rounded-b-md">
          {!['Completed', 'Scheduled', 'Delayed'].includes(currentView) ? (
            <Input
              onMouseEnter={() => setIsInputHovered(true)}
              onMouseLeave={() => setIsInputHovered(false)}
              title={title}
              setTitle={setTitle}
              date={date}
              setDate={setDate}
              onAddTask={handleAddTask}
            />
          ) : (
            <h3 className="text-2xl font-semibold mb-4 text-center capitalize text-white">
              {currentView}
            </h3>
          )}
        </div>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: any) => (
            <Task
              key={task.id}
              {...task}
              handleDelete={() => handleDelete(task.id)}
              handleUpdate={handleUpdate}
              handleToggleCompleted={() => handleToggleCompleted(task.id)}
              isInputHovered={isInputHovered}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <h3 className="text-lg font-semibold">No tasks found</h3>
            <p className="text-sm italic">
              {currentView === 'all-tasks'
                ? "Add a task above to get started"
                : `No "${currentView}" tasks found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
