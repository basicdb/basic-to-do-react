import { useSearchParams } from 'react-router-dom'
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader
} from "@/components/ui/sidebar"
import { MENU_ITEMS } from "@/lib/utils"

export function SidebarHeaderContent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentView = searchParams.get('view') || 'all-tasks';

    const handleViewChange = (view: string) => {
        setSearchParams({ view });
    };

    return (
        <>
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
                            {MENU_ITEMS.map(({ view, label, icon: Icon, className }) => (
                                <SidebarMenuItem key={view}>
                                    <SidebarMenuButton
                                        isActive={currentView === view}
                                        onClick={() => handleViewChange(view)}
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
            </SidebarContent>
        </>
    )
}
