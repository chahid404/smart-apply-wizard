import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import { Header } from "./Header";
import { AppSidebar } from "./Sidebar";

export const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sand via-mint-light/10 to-teal-light/20 p-3 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
