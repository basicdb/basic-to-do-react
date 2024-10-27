import React, { useState, useEffect } from 'react';
import { DatePickerDemo } from './DateTimePicker';

interface InputProps {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    title: string;
    setTitle: (title: string) => void;
    date: Date | null;
    setDate: (date: Date | null) => void;
    onAddTask: () => void;
}

const Input: React.FC<InputProps> = ({ onMouseEnter, onMouseLeave, title, setTitle, date, setDate, onAddTask }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const shouldShowDatePicker = isHovered || isPopoverOpen;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask();
    };

    const handleDateChange = (newDate: Date | null) => {
        setDate(newDate);
        setIsPopoverOpen(false);
    };

    return (
        <form className="space-y-4 group w-full"
            onMouseEnter={() => {
                setIsHovered(true);
                onMouseEnter?.();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onMouseLeave?.();
            }}
            onSubmit={handleSubmit}>
            <div className="flex w-full">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="I want to..."
                    className="flex-grow px-4 py-2 border border-[#383e47] text-[#9ba3af] rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#1d232a]"
                />
                <button type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                > Submit
                </button>
            </div>
            <div className="h-10 relative">
                <div className={`flex space-x-4 absolute inset-0 transition-opacity duration-300 ${shouldShowDatePicker ? 'opacity-100' : 'opacity-0'}`}>
                    <DatePickerDemo
                        date={date}
                        setDate={handleDateChange}
                        isPopoverOpen={isPopoverOpen}
                        setIsPopoverOpen={setIsPopoverOpen}
                    />
                </div>
            </div>
        </form>
    );
};

export default Input;
