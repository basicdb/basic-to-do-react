import { User2, ChevronUp } from "lucide-react"
import { Sidebar, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarHeaderContent } from "./SidebarHeaderContent"
import { EXTERNAL_LINKS } from "@/lib/utils"

import { useBasic } from '@basictech/react'

export function AppSidebar() {
    const { isSignedIn, user, dbStatus } = useBasic()

    console.log(dbStatus, user)
    return (
        <Sidebar>
            <SidebarHeaderContent />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {user?.email}
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
                                {!isSignedIn ? (
                                    <div onClick={() => console.log("insert signin / signout here")} className="flex items-center hover:bg-gray-100 rounded">
                                        <DropdownMenuItem className="w-full cursor-pointer">
                                            Login
                                        </DropdownMenuItem>
                                    </div>
                                ) : (
                                    <div onClick={() => console.log("insert signin / signout here")} className="flex items-center hover:bg-gray-100 rounded">
                                        <DropdownMenuItem className="w-full cursor-pointer">
                                            Signout
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
