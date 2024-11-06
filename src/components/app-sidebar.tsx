import {
    Inbox,
    CalendarClock,
    Calendar,
    FolderCheck,
    User2,
    ChevronUp,
    ExternalLink,
    BookOpenText
} from "lucide-react"
import { useSearchParams } from 'react-router-dom'

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
