import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllApplications from "./pages/AllApplications";
import ApplicationDetails from "./pages/ApplicationDetails";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Tokens from "./pages/Tokens";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/application/:id" element={<ApplicationDetails />} />
          <Route path="/applications" element={<AllApplications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
