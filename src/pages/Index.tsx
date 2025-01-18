import { useState } from "react";
import { WizardProgress } from "@/components/wizard/WizardProgress";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { FileUpload } from "@/components/wizard/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";

const STEPS = ["Job URL", "Resume & Cover Letter", "Personal Info", "Review"];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jobUrl: "",
    resume: null as File | null,
    withExtraUserDetails: true,
    extraUserDetails: "",
    name: "",
    email: "",
    phone: "",
  });
  const { toast } = useToast();

  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
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
    if (currentStep === 3 && (!formData.name || !formData.email)) {
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WizardLayout title="Enter Job URL" currentStep={currentStep} totalSteps={STEPS.length}>
            <div className="space-y-4">
              <div className="space-y-2 py-4">
                <Label htmlFor="jobUrl">Job Posting URL</Label>
                <Input
                  id="jobUrl"
                  placeholder="https://example.com/job-posting"
                  value={formData.jobUrl}
                  onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                  onBlur={(e) => {
                    if (!isValidUrl(e.target.value)) {
                      toast({
                        title: "Please enter a valid URL",
                        variant: "destructive",
                      });
                    }
                  }}
                />
              </div>
            </div>
          </WizardLayout>
        );
      case 2:
        return (
          <WizardLayout title="Upload Resume & Generate Cover Letter" currentStep={currentStep} totalSteps={STEPS.length}>
            <div className="space-y-8">
              <div className="space-y-2 py-4">
                <Label>Resume</Label>
                <FileUpload selectedFile={formData.resume} onFileSelect={(file) => setFormData({ ...formData, resume: file })} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="extra-user-details"
                    checked={formData.withExtraUserDetails}
                    onCheckedChange={(checked) => setFormData({ ...formData, withExtraUserDetails: checked })}
                  />
                  <Label htmlFor="extra-user-details">Add extra details about yourself</Label>
                </div>
                {formData.withExtraUserDetails && (
                  <Textarea
                    placeholder="Give us a extra details about yourself, your skills, and your experience..."
                    value={formData.extraUserDetails}
                    onChange={(e) => setFormData({ ...formData, extraUserDetails: e.target.value })}
                    className="h-48"
                  />
                )}
              </div>
            </div>
          </WizardLayout>
        );
      case 3:
        return (
          <WizardLayout title="Personal Information" currentStep={currentStep} totalSteps={STEPS.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 py-4">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2 py-4">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="space-y-2 py-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>
          </WizardLayout>
        );
      case 4:
        return (
          <WizardLayout title="Review Application" currentStep={currentStep} totalSteps={STEPS.length}>
            <div className="space-y-6">
              <div className="space-y-2 py-4">
                <h3 className="text-sm font-medium text-gray-500">Job URL</h3>
                <p className="text-navy">{formData.jobUrl}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Resume</h3>
                <p className="text-navy">{formData.resume?.name}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Cover Letter</h3>
                <p className="text-navy whitespace-pre-wrap">{formData.extraUserDetails || "No cover letter generated yet"}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="text-navy">{formData.name}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-navy">{formData.email}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="text-navy">{formData.phone || "Not provided"}</p>
                </div>
              </div>
            </div>
          </WizardLayout>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sand via-mint-light/10 to-teal-light/20 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto pt-6 sm:pt-12 pb-12 sm:pb-24">
              <h1 className="text-3xl sm:text-4xl font-bold text-navy text-center mb-8 sm:mb-12 px-4">AI Job Application</h1>
              <Card className="p-6 sm:p-8">
                <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
                <div className="flex justify-end space-x-4 mt-8">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={handleBack} className="w-24 sm:w-32">
                      Back
                    </Button>
                  )}
                  <Button onClick={handleNext} className="w-24 sm:w-32 bg-navy hover:bg-navy-light text-white">
                    {currentStep === 4 ? "Submit" : "Next"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
