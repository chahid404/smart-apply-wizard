
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Coins, Layout, PlusCircle, User } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

export const Header = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(() => {
      navigate("/");
    });
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-white/50 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-2 sm:px-4 gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger />
          <h1 className="text-base sm:text-lg font-semibold text-navy truncate max-w-[200px] sm:max-w-none">AI Job Application Platform</h1>
        </div>
        <div className="flex items-center gap-3 sm:gap-6 mr-2 sm:mr-6">
          <div className="hidden sm:flex items-center gap-2">
            <Coins className="h-4 w-4" />
            <span className="font-semibold">1000 Tokens</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage src={user?.imageUrl || ""} alt={user?.fullName || "User"} />
                <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0) || ""}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group cursor-pointer">
                <User className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                <span className="transition-colors group-hover:text-navy">{user?.fullName || "User"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group cursor-pointer">
                <Coins className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                <span className="transition-colors group-hover:text-navy">1000 Tokens</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group cursor-pointer">
                <PlusCircle className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                <span className="transition-colors group-hover:text-navy">Add Tokens</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group cursor-pointer">
                <Layout className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                <span className="transition-colors group-hover:text-navy">Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group cursor-pointer"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transition-transform group-hover:scale-110">
                  <path d="M13.5 7.5L10.5 4.5M13.5 7.5L10.5 10.5M13.5 7.5L4 7.5M8 13.5H1.5V1.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="transition-colors group-hover:text-navy">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
