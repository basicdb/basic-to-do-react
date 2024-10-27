import {
    Plus,
    Pencil,
    Inbox,
    CalendarClock,
    Calendar,
    FolderCheck,
    User2,
    ChevronUp,
    ExternalLink,
    BookOpenText
} from "lucide-react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useSearchParams } from 'react-router-dom'
import { useTaskContext } from "@/contexts/TaskContext";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarGroupAction,
    SidebarMenuAction,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentView = searchParams.get('view') || 'all-tasks';
    const { updateTaskTags } = useTaskContext();

    const [editingItem, setEditingItem] = useState<string | null>(null)
    const [editedTitle, setEditedTitle] = useState("")
    const [items, setItems] = useState([{ title: "New list", url: "#" }])
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleEditClick = (title: string) => {
        setEditingItem(title)
        setEditedTitle(title)
        handleViewChange(title)
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    const handleSaveTitle = () => {
        if (editingItem) {
            setItems(items.map(item =>
                item.title === editingItem ? { ...item, title: editedTitle } : item
            ));
            updateTaskTags(editingItem, editedTitle);
            setEditingItem(null);
            handleViewChange(editedTitle);
        }
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
            !(event.target instanceof Element && event.target.closest('[role="menuitem"]'))) {
            handleSaveTitle()
        }
    }, [handleSaveTitle])

    useEffect(() => {
        if (editingItem) {
            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [editingItem, handleClickOutside])

    const handleAddProject = () => {
        const newTitle = `New list ${items.length + 1}`
        setItems([...items, { title: newTitle, url: "#" }])
        setEditingItem(newTitle)
        setEditedTitle(newTitle)
        handleViewChange(newTitle)
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    const handleViewChange = (view: string) => {
        setSearchParams({ view });
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center space-x-2">
                    <img src="./images/logo_light.png" alt="Basic logo" className="w-5 h-5" />
                    <p className="text-sm font-semibold">Basic</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={currentView === "all-tasks"}
                                    onClick={() => handleViewChange("all-tasks")}
                                >
                                    <Inbox />
                                    <span>All Tasks</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={currentView === "Delayed"}
                                    onClick={() => handleViewChange("Delayed")}
                                    className="text-red-400"
                                >
                                    <CalendarClock />
                                    <span>Delayed</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={currentView === "Scheduled"}
                                    onClick={() => handleViewChange("Scheduled")}
                                >
                                    <Calendar />
                                    <span>Scheduled</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={currentView === "Completed"}
                                    onClick={() => handleViewChange("Completed")}
                                >
                                    <FolderCheck />
                                    <span>Completed</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>My lists</SidebarGroupLabel>
                    <SidebarGroupAction title="Add Project" onClick={handleAddProject}>
                        <Plus /> <span className="sr-only">Add Project</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild
                                        isActive={currentView === item.title}
                                        onClick={() => handleViewChange(item.title)}>
                                        <a href={item.url}>
                                            {editingItem === item.title ? (
                                                <input
                                                    ref={inputRef}
                                                    value={editedTitle}
                                                    onChange={(e) => setEditedTitle(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                                                    className="border-b border-gray-300 focus:outline-none bg-transparent"
                                                />
                                            ) : (
                                                <span>{item.title}</span>
                                            )}
                                        </a>
                                    </SidebarMenuButton>
                                    <SidebarMenuAction
                                        onClick={() => handleEditClick(item.title)}
                                        className="hover:bg-[#36373a] hover:text-gray-400 text-gray-700 transition-all duration-100"
                                    >
                                        <Pencil />
                                    </SidebarMenuAction>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Create account
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <a href="https://basic.tech" target="_blank" rel="noopener noreferrer" className="flex items-center hover:bg-gray-100 rounded">
                                    <DropdownMenuItem className="w-full cursor-pointer">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        <span>Learn about Basic</span>
                                    </DropdownMenuItem>
                                </a>
                                <a href="https://docs.basic.tech" target="_blank" rel="noopener noreferrer" className="flex items-center hover:bg-gray-100 rounded">
                                    <DropdownMenuItem className="w-full cursor-pointer">
                                        <BookOpenText className="mr-2 h-4 w-4" />
                                        <span>Documentation</span>
                                    </DropdownMenuItem>
                                </a>
                                <a href="/login" className="flex items-center hover:bg-gray-100 rounded">
                                    <DropdownMenuItem className="w-full cursor-pointer">
                                        Login
                                    </DropdownMenuItem>
                                </a>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
