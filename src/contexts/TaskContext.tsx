import { createContext, useContext, useState, useCallback } from 'react';

interface Task {
    id: string;
    title: string;
    date: Date | null;
    completed: boolean;
    tags: string[];
}

interface TaskContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    updateTaskTags: (oldTag: string, newTag: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "1",
            title: "Complete project proposal",
            date: new Date("2024-02-15T00:00:00"),
            completed: false,
            tags: ["Delayed"]
        },
        {
            id: "2",
            title: "Review code changes",
            date: new Date("2024-11-16T00:00:00"),
            completed: true,
            tags: ["Scheduled"]
        },
        {
            id: "3",
            title: "Prepare presentation",
            date: null,
            completed: false,
            tags: []
        },
    ]);

    const updateTaskTags = useCallback((oldTag: string, newTag: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task => ({
                ...task,
                tags: task.tags.map(tag => tag === oldTag ? newTag : tag)
            }))
        );
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, setTasks, updateTaskTags }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}
