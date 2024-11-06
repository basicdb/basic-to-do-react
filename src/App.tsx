import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Task from '@/components/Task';
import Input from '@/components/Input';
import { useTaskContext } from '@/contexts/TaskContext';
import { generateRandomId } from '@/lib/utils';

export default function Home() {
  // Code that gets tasks
  const { tasks, setTasks } = useTaskContext();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  // Code that adds a task
  const handleAddTask = () => {
    if (title.trim()) {
      const newTask = {
        id: generateRandomId(),
        title,
        date: date || null,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setTitle('');
      setDate(null);
    }
  };

  // Code that deletes a task
  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Code that updates a task
  const handleUpdate = (id: string, field: 'title' | 'date', value: string | Date | null) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const handleToggleCompleted = (id: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Rest of the code
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [searchParams] = useSearchParams();
  const currentView = searchParams.get('view') ?? 'all-tasks';

  const getFilteredTasks = useCallback(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    switch (currentView) {
      case 'all-tasks':
        return tasks;
      case 'Completed':
        return tasks.filter(task => task.completed);
      case 'Delayed':
        return tasks.filter(task =>
          !task.completed && task.date && new Date(task.date) < now
        );
      case 'Scheduled':
        return tasks.filter(task =>
          !task.completed && task.date && new Date(task.date) >= now
        );
      default:
        return tasks;
    }
  }, [tasks, currentView]);

  const filteredTasks = getFilteredTasks();

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
          filteredTasks.map((task) => (
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
