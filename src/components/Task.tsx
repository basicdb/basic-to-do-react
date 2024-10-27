import React, { useState } from 'react';
import { Trash2, Check } from 'lucide-react';
import { DatePickerDemo } from './DateTimePicker';

export interface TaskProps {
    id: string;
    title: string;
    date: Date | null;
    completed: boolean;
    tags: string[];  // Add this line
    handleDelete: () => void;
    handleUpdate: (id: string, field: 'title' | 'date', value: string | Date | null) => void;
    handleToggleCompleted: () => void;
    style?: React.CSSProperties;
    isInputHovered?: boolean;
}

const Task: React.FC<TaskProps> = ({ id, title, date, completed, handleDelete, handleUpdate, handleToggleCompleted, style, isInputHovered }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleSave = (value: string) => {
        handleUpdate(id, 'title', value);
        setEditingTitle(false);
    };

    const isDateTodayOrEarlier = date && new Date(date).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0);

    return (
        <div
            className={`w-full flex my-4 items-center p-4 rounded-lg transition-all duration-300 hover:shadow-md relative text-sm min-h-[70px] text-white`}
            style={{
                ...style,
                opacity: isInputHovered ? 0.3 : 1,
                transition: 'opacity 0.15s ease-in-out',
                backgroundColor: '#1a1a1a'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="mr-4 z-10 relative">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={handleToggleCompleted}
                    className={`appearance-none w-5 h-5 border rounded-sm cursor-pointer transition-all duration-100 ease-in-out ${completed
                        ? 'bg-[#a6acba] border-[#a6acba]'
                        : 'border-[#a6acba] hover:border-[#c0c5d1]'
                        }`}
                />
                {completed && (
                    <Check
                        className="absolute top-0 left-0 w-5 h-5 text-[#1d232a] pointer-events-none"
                        strokeWidth={3}
                    />
                )}
            </div>
            <div className="flex-grow overflow-hidden">
                {editingTitle ? (
                    <input
                        type="text"
                        defaultValue={title}
                        onBlur={(e) => handleSave(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave(e.currentTarget.value)}
                        className="p-1 mb-2 border rounded text-[#e1e1e1] bg-[#1d232a] focus:outline-none font-semibold truncate"
                        autoFocus
                    />
                ) : (
                    <p
                        onClick={() => setEditingTitle(true)}
                        className={`font-semibold mb-2 truncate hover:underline cursor-text transition-all duration-150 transition-colors duration-200 ${completed
                            ? 'line-through italic text-[#9ba3af]'
                            : 'text-gray-200'
                            }`}
                    >
                        {title}
                    </p>
                )}
                <DatePickerDemo
                    width="max-w-[250px] text-xs p-2"
                    border={`border-[#1d1d1d] ${isDateTodayOrEarlier && !completed ? 'text-red-300' : ''}`}
                    date={date}
                    setDate={(newDate) => handleUpdate(id, 'date', newDate)}
                    isPopoverOpen={isPopoverOpen}
                    setIsPopoverOpen={setIsPopoverOpen}
                />
            </div>
            {isHovered && (
                <button onClick={handleDelete} className="p-2 rounded-full hover:bg-[#36373a] transition-all duration-100">
                    <Trash2 className="h-4 w-4 text-red-400" />
                </button>
            )}
        </div>
    );
};

export default Task;
