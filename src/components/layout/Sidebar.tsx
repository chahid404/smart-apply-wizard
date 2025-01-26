import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { routes, routeTitles } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Coins, FileText, Home, Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { title: routeTitles[routes.Dashboard], icon: Home, url: routes.Dashboard },
  { title: routeTitles[routes.Applications], icon: FileText, url: routes.Applications },
  { title: routeTitles[routes.Profile], icon: Users, url: routes.Profile },
  { title: routeTitles[routes.Tokens], icon: Coins, url: routes.Tokens },
  { title: routeTitles[routes.Settings], icon: Settings, url: routes.Settings },
];

export const AppSidebar = () => {
  const navigate = useNavigate();
  const { setOpenMobile, isMobile } = useSidebar();

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
                    onClick={() => {
                      navigate(`${item.url}`);
                      if (isMobile) {
                        setOpenMobile(false);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-3 p-3",
                      "transition-all duration-300 ease-out",
                      "rounded-xl border border-transparent",
                      "hover:border-mint/20 hover:bg-gradient-to-r hover:from-white hover:to-mint/5",
                      "text-navy font-medium",
                      "group relative overflow-hidden"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-teal transition-transform duration-300 ease-out group-hover:scale-110" />
                      <span className="transition-colors duration-300 group-hover:text-navy">{item.title}</span>
                    </div>
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
