import { User2, ChevronUp } from "lucide-react"
import { Sidebar, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarHeaderContent } from "./SidebarHeaderContent"
import { EXTERNAL_LINKS } from "@/lib/utils"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeaderContent />
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
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                {EXTERNAL_LINKS.map(({ href, icon: Icon, label }) => (
                                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center hover:bg-gray-100 rounded">
                                        <DropdownMenuItem className="w-full cursor-pointer">
                                            <Icon className="mr-2 h-4 w-4" />
                                            <span>{label}</span>
                                        </DropdownMenuItem>
                                    </a>
                                ))}

                                {/* Code for auth */}
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
