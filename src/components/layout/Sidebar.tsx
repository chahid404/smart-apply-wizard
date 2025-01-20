import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { FileText, Home, Settings, Users } from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Applications", icon: FileText, url: "/applications" },
  { title: "Profile", icon: Users, url: "/profile" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-navy">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <a
                    href={item.url}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      "transition-all duration-200 ease-in-out",
                      "hover:bg-mint/10 hover:translate-x-1",
                      "text-navy font-medium",
                      "group relative"
                    )}
                  >
                    <span className="absolute left-0 w-1 h-0 bg-teal rounded-r transition-all duration-200 group-hover:h-full" />
                    <item.icon className="h-5 w-5 text-teal transition-colors duration-200 group-hover:text-teal-light" />
                    <span className="transition-colors duration-200 group-hover:text-navy-light">{item.title}</span>
                  </a>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};