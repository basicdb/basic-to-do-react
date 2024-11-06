import { useBasic, useQuery } from '@basictech/react'
import { useState, useRef, useCallback, useEffect } from "react"
import { useSearchParams } from 'react-router-dom'
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
import logoLight from "@/assets/logo_light.png"

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

const MAIN_MENU_ITEMS = [
    { id: 'all-tasks', label: 'All Tasks', icon: Inbox },
    { id: 'Delayed', label: 'Delayed', icon: CalendarClock, className: 'text-red-400' },
    { id: 'Scheduled', label: 'Scheduled', icon: Calendar },
    { id: 'Completed', label: 'Completed', icon: FolderCheck },
];

export function AppSidebar() {
    const { signin, isSignedIn, user, signout, db } = useBasic()
    const [searchParams, setSearchParams] = useSearchParams();
    const [editingList, setEditingList] = useState<string | null>(null)
    const [editedTitle, setEditedTitle] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null)

    const todos = useQuery(() => db.collection('todos').getAll())
    const lists = useQuery(() => db.collection('lists').getAll())

    const currentView = searchParams.get('view') || 'all-tasks';

    const handleViewChange = (view: string) => {
        setSearchParams({ view });
    };

    const handleEditClick = (title: string) => {
        setEditingList(title)
        setEditedTitle(title)
        handleViewChange(title)
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    const handleSaveTitle = () => {
        if (editingList) {
            const listToUpdate = lists?.find((list: any) => list.title === editingList)
            if (listToUpdate) {
                db.collection('lists').update(listToUpdate.id, { title: editedTitle })

                todos?.forEach((task: any) => {
                    if (task.tags.includes(editingList)) {
                        const updatedTags = task.tags.map((tag: string) =>
                            tag === editingList ? editedTitle : tag
                        )
                        db.collection('todos').update(task.id, { tags: updatedTags })
                    }
                })
            }
            setEditingList(null)
            handleViewChange(editedTitle)
        }
    }

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
            !(event.target instanceof Element && event.target.closest('[role="menuitem"]'))) {
            handleSaveTitle()
        }
    }, [handleSaveTitle])

    useEffect(() => {
        if (editingList) {
            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [editingList, handleClickOutside])

    const handleAddList = () => {
        const newTitle = `New list ${(lists?.length || 0) + 1}`
        db.collection('lists').add({ title: newTitle })
        setEditingList(newTitle)
        setEditedTitle(newTitle)
        handleViewChange(newTitle)
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center space-x-2">
                    <img src={logoLight} alt="Basic logo" className="w-5 h-5" />
                    <p className="text-sm font-semibold">Basic</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {MAIN_MENU_ITEMS.map(({ id, label, icon: Icon, className }) => (
                                <SidebarMenuItem key={id}>
                                    <SidebarMenuButton
                                        isActive={currentView === id}
                                        onClick={() => handleViewChange(id)}
                                        className={className}
                                    >
                                        <Icon />
                                        <span>{label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>My lists</SidebarGroupLabel>
                    <SidebarGroupAction title="Add List" onClick={handleAddList}>
                        <Plus /> <span className="sr-only">Add List</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {lists?.map((list: any) => (
                                <SidebarMenuItem key={list.id}>
                                    <SidebarMenuButton asChild
                                        isActive={currentView === list.title}
                                        onClick={() => handleViewChange(list.title)}>
                                        <a>
                                            {editingList === list.title ? (
                                                <input
                                                    ref={inputRef}
                                                    value={editedTitle}
                                                    onChange={(e) => setEditedTitle(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                                                    className="border-b border-gray-300 focus:outline-none bg-transparent"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            ) : (
                                                <span onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(list.title);
                                                }}>
                                                    {list.title}
                                                </span>
                                            )}
                                        </a>
                                    </SidebarMenuButton>
                                    <SidebarMenuAction
                                        onClick={() => handleEditClick(list.title)}
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
                                    <User2 /> {isSignedIn ? user?.email : "Create account"}
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
                                {isSignedIn ? (
                                    <div onClick={signout} className="flex items-center hover:bg-gray-100 rounded">
                                        <DropdownMenuItem className="w-full cursor-pointer">
                                            Logout
                                        </DropdownMenuItem>
                                    </div>
                                ) : (
                                    <div onClick={signin} className="flex items-center hover:bg-gray-100 rounded">
                                        <DropdownMenuItem className="w-full cursor-pointer">
                                            Login
                                        </DropdownMenuItem>
                                    </div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
