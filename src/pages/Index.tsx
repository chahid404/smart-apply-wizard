import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { AnimatePresence } from "framer-motion";
import { ResumeData } from "@/types/resume";
import { WizardSteps } from "@/components/wizard/WizardSteps";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jobUrl: "",
    resume: null as File | null,
    withExtraUserDetails: true,
    extraUserDetails: "",
  });
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedResumeData = localStorage.getItem('resumeData');
    if (savedResumeData) {
      setResumeData(JSON.parse(savedResumeData));
    }
  }, []);

  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(url);
  };

  const handleNext = () => {
    if (currentStep === 1 && (!formData.jobUrl || !isValidUrl(formData.jobUrl))) {
      toast({
        title: "Please enter a valid job URL",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 2 && !formData.resume) {
      toast({
        title: "Please upload your resume",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 3 && (!resumeData?.personalInfo.fullName || !resumeData?.personalInfo.email)) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting application:", formData);
    toast({
      title: "Application submitted successfully!",
      description: "We'll notify you once it's processed.",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sand via-mint-light/10 to-teal-light/20 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto pt-6 sm:pt-12 pb-12 sm:pb-24">
              <h1 className="text-3xl sm:text-4xl font-bold text-navy text-center mb-8 sm:mb-12 px-4">
                AI Job Application
              </h1>
              <Card className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <WizardSteps
                    currentStep={currentStep}
                    formData={formData}
                    resumeData={resumeData}
                    onFormDataChange={setFormData}
                    onResumeDataChange={setResumeData}
                    onResumeDataExtracted={(data) => {
                      setResumeData(data);
                      localStorage.setItem('resumeData', JSON.stringify(data));
                    }}
                  />
                </AnimatePresence>
                <WizardNavigation
                  currentStep={currentStep}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;