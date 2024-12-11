import { User2, ChevronUp } from "lucide-react"
import { Sidebar, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarHeaderContent } from "./SidebarHeaderContent"
import { EXTERNAL_LINKS } from "@/lib/utils"
import { useBasic } from "@basictech/react"

export function AppSidebar() {
    const { signin, signout, isAuthReady, isSignedIn, user } = useBasic()
    return (
        <Sidebar>
            <SidebarHeaderContent />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    {isAuthReady && isSignedIn ? user?.email : <><User2 /> Create account</>}
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
                                {isAuthReady &&
                                    !isSignedIn ? <div onClick={() => signin()} className="flex items-center hover:bg-gray-100 rounded">
                                    <DropdownMenuItem className="w-full cursor-pointer">
                                        Login
                                    </DropdownMenuItem>
                                </div>
                                    : <div onClick={() => signout()} className="flex items-center hover:bg-gray-100 rounded">
                                        <DropdownMenuItem className="w-full cursor-pointer">
                                            Logout
                                        </DropdownMenuItem>
                                    </div>
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
