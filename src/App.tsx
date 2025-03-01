
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { SidebarProvider } from "./components/ui/sidebar";
import AllApplications from "./pages/AllApplications";
import ApplicationDetails from "./pages/ApplicationDetails";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Tokens from "./pages/Tokens";
import LandingPage from "./pages/LandingPage";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in/*" element={
              <SignedOut>
                <SignIn routing="path" path="/sign-in" />
              </SignedOut>
            } />
            <Route path="/sign-up/*" element={
              <SignedOut>
                <SignUp routing="path" path="/sign-up" />
              </SignedOut>
            } />
            
            {/* Protected routes */}
            <Route element={
              <SignedIn>
                <Layout />
              </SignedIn>
            }>
              <Route path="/dashboard" element={<Index />} />
              <Route path="/application/:id" element={<ApplicationDetails />} />
              <Route path="/applications" element={<AllApplications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tokens" element={<Tokens />} />
            </Route>
            
            {/* Redirect from old routes */}
            <Route path="/index" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
