import { Home, FileText, Users, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Applications", icon: FileText, url: "/applications" },
  { title: "Profile", icon: Users, url: "/profile" },
  { title: "Settings", icon: Settings, url: "/settings" },
]

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      className="flex items-center gap-2 w-full transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group"
                    >
                      <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <span className="transition-colors group-hover:text-navy">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}