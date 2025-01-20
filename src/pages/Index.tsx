import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sand via-mint-light/10 to-teal-light/20 p-3 sm:p-6">
            <div className="max-w-4xl mx-auto pt-4 sm:pt-12 pb-8 sm:pb-24">
              <h1 className="text-2xl sm:text-4xl font-bold text-navy text-center mb-6 sm:mb-12 px-2 sm:px-4">
                Welcome to AI Job Application Platform
              </h1>
              {/* Add your index page content here */}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
