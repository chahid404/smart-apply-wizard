import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RedirectRoute from "./components/authentification/RedirectRoute";
import { Layout } from "./components/layout/Layout";
import { SidebarProvider } from "./components/ui/sidebar";
import { routes } from "./lib/routes";
import AllApplications from "./pages/AllApplications";
import ApplicationDetails from "./pages/ApplicationDetails";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Tokens from "./pages/Tokens";

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
            <Route path={routes.Home} element={<LandingPage />} />
            <Route
              path="/sign-in/*"
              element={
                <SignedOut>
                  <SignIn routing="path" path={routes.SignIn} />
                </SignedOut>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <SignedOut>
                  <SignUp routing="path" path={routes.SignUp} />
                </SignedOut>
              }
            />

            {/* Protected routes */}
            <Route
              element={
                <SignedIn>
                  <Layout />
                </SignedIn>
              }
            >
              <Route path={routes.APPLY_NOW} element={<Index />} />
              <Route path={routes.ApplicationById} element={<ApplicationDetails />} />
              <Route path={routes.Applications} element={<AllApplications />} />
              <Route path={routes.Profile} element={<Profile />} />
              <Route path={routes.Tokens} element={<Tokens />} />
            </Route>
            <Route path="*" element={<RedirectRoute />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
