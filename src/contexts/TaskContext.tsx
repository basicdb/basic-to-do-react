import { createContext, useContext, useState } from 'react';

interface Task {
    id: string;
    title: string;
    date: Date | null;
    completed: boolean;
}

interface TaskContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "1",
            title: "Complete project proposal",
            date: new Date("2024-02-15T00:00:00"),
            completed: false
        },
        {
            id: "2",
            title: "Review code changes",
            date: new Date("2024-11-16T00:00:00"),
            completed: true
        },
        {
            id: "3",
            title: "Prepare presentation",
            date: new Date("2025-06-21T00:00:00"),
            completed: false
        },
    ]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
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
