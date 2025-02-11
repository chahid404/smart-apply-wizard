import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { WizardSteps } from "@/components/wizard/WizardSteps";
import { ExtraInformation, ResumeData } from "@/types/resume";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [formData, setFormData] = useState({
    jobUrl: "",
    resume: null as File | null,
    extraInformation: {
      extraDetails: "",
      noticePeriod: "",
      salaryExpectations: {
        salaryRangeUsd: "",
      },
      legalAuthorization: {
        euWorkAuthorization: false,
        usWorkAuthorization: false,
        canadaWorkAuthorization: false,
        ukWorkAuthorization: false,
        requiresUsVisa: false,
        requiresUsSponsorship: false,
        requiresEuVisa: false,
        requiresEuSponsorship: false,
        requiresCanadaVisa: false,
        requiresCanadaSponsorship: false,
        requiresUkVisa: false,
        requiresUkSponsorship: false,
        legallyAllowedToWorkInEu: false,
        legallyAllowedToWorkInUs: false,
        legallyAllowedToWorkInCanada: false,
        legallyAllowedToWorkInUk: false,
      },
      workPreferences: {
        remoteWork: false,
        inPersonWork: false,
        openToRelocation: false,
        willingToCompleteAssessments: false,
        willingToUndergoDrugTests: false,
        willingToUndergoBackgroundChecks: false,
      },
    } as ExtraInformation,
  });
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedResumeData = localStorage.getItem("resumeData");
    const hasCompletedFirstTime = localStorage.getItem("hasCompletedFirstTime");
    
    if (savedResumeData) {
      setResumeData(JSON.parse(savedResumeData));
    }
    
    if (hasCompletedFirstTime) {
      setIsFirstTime(false);
    }

    // Show the welcome toast for first-time users
    if (!hasCompletedFirstTime) {
      toast({
        title: "🎉 Welcome to AI Job Applier!",
        description: "Don't worry about filling out those boring forms over and over - do it once, and we'll remember everything for your future applications! Let's make job hunting fun! 🚀",
        duration: 6000,
      });
    }
  }, [toast]);

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
    if (
      currentStep === 4 &&
      (!formData.extraInformation?.noticePeriod || !formData.extraInformation?.salaryExpectations.salaryRangeUsd)
    ) {
      toast({
        title: "Please fill in notice period and salary expectation",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      
      // If this is the first time and we're moving past step 4
      if (isFirstTime && currentStep === 4) {
        localStorage.setItem("hasCompletedFirstTime", "true");
        setIsFirstTime(false);
        toast({
          title: "🎈 Awesome job!",
          description: "We've saved your info for future applications. Next time, it'll be even faster! Just upload your resume and go! 🏃‍♂️💨",
        });
      }
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
      <h1 className="text-2xl sm:text-4xl font-bold text-navy text-center mb-6 sm:mb-12 px-2 sm:px-4">AI Job Application</h1>
      {isFirstTime && currentStep === 1 && (
        <div className="mx-2 sm:mx-0 mb-6 p-4 bg-mint/20 rounded-lg border border-mint text-navy animate-fade-in">
          <p className="text-center">
            🎯 <span className="font-semibold">Pro tip:</span> Fill out your details once, and we'll remember them forever!
            Think of it as creating your personal job-hunting superpower! 🦸‍♂️✨
          </p>
        </div>
      )}
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