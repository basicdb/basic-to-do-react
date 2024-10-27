"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo({
    date,
    setDate,
    isPopoverOpen,
    setIsPopoverOpen,
    width = "w-full",
    border = "border border-[#383e47]"
}: {
    date: Date | null,
    setDate: (date: Date | null) => void,
    isPopoverOpen: boolean,
    setIsPopoverOpen: (open: boolean) => void,
    width?: string, // New prop type
    border?: string // New prop type
}) {
    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        `${width} justify-start text-left font-normal bg-[#1d1d1d] hover:bg-[#1d232a] hover:text-white text-[#9ba3af] ${border}`,
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={(newDate) => setDate(newDate || null)}
                    initialFocus
                />
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                        setDate(null);
                        setIsPopoverOpen(false);
                    }}
                >
                    Clear
                </Button>
            </PopoverContent>
        </Popover>
    )
}
