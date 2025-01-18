import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Coins, Layout, PlusCircle, SignOut, User } from "@phosphor-icons/react";

export const Header = () => {
  return (
    <header className="h-16 border-b bg-white/50 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold text-navy truncate">AI Job Application Platform</h1>
        </div>
        <div className="flex items-center mr-6 gap-6">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            <span className="font-semibold">1000 Tokens</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                User Name
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Tokens
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Layout className="h-4 w-4 mr-2" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
