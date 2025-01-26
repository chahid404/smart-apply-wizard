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
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
