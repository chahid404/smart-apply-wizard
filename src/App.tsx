import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { AppSidebar } from "./components/layout/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import Index from "./pages/Index";
import ApplicationDetails from "./pages/ApplicationDetails";
import AllApplications from "./pages/AllApplications";
import Profile from "./pages/Profile";
import Tokens from "./pages/Tokens";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-sand">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/application/:id" element={<ApplicationDetails />} />
              <Route path="/applications" element={<AllApplications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tokens" element={<Tokens />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;