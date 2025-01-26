import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { WizardSteps } from "@/components/wizard/WizardSteps";
import { ResumeData } from "@/types/resume";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jobUrl: "",
    resume: null as File | null,
    additionalInfo: "",
    candidateInfo: {
      visaStatus: {
        europe: false,
        usa: false,
      },
      noticePeriod: "",
      salaryExpectation: "",
      gender: "prefer_not_to_say" as const,
      workPreference: "onsite" as const,
      availableToTravel: false,
      willingToRelocate: false,
      currentEmploymentStatus: "employed" as const,
    },
  });
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedResumeData = localStorage.getItem("resumeData");
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
    if (currentStep === 4 && (!formData.candidateInfo?.noticePeriod || !formData.candidateInfo?.salaryExpectation)) {
      toast({
        title: "Please fill in notice period and salary expectation",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < 5) {
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
    <div className="max-w-4xl mx-auto pt-4 sm:pt-12 pb-8 sm:pb-24">
      <h1 className="text-2xl sm:text-4xl font-bold text-navy text-center mb-6 sm:mb-12 px-2 sm:px-4">
        AI Job Application
      </h1>
      <Card className="p-4 sm:p-8 mx-2 sm:mx-0">
        <AnimatePresence mode="wait">
          <WizardSteps
            currentStep={currentStep}
            formData={formData}
            resumeData={resumeData}
            onFormDataChange={setFormData}
            onResumeDataChange={setResumeData}
            onResumeDataExtracted={(data) => {
              setResumeData(data);
              localStorage.setItem("resumeData", JSON.stringify(data));
            }}
          />
        </AnimatePresence>
        <WizardNavigation currentStep={currentStep} onNext={handleNext} onBack={handleBack} />
      </Card>
    </div>
  );
};

export default Index;