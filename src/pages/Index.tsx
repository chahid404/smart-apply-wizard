import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { WizardSteps } from "@/components/wizard/WizardSteps";
import { ExtraInformation, ResumeData } from "@/types/resume";
import { stepValidations } from "@/utils/stepValidations";
import { validateStep } from "@/utils/validation";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [formData, setFormData] = useState({
    jobUrl: "",
    resume: null as File | null,
    resumeData: null as ResumeData | null,
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

  // Load saved data on component mount
  useEffect(() => {
    const hasCompletedFirstTime = localStorage.getItem("hasCompletedFirstTime");
    //TODO update onboarding mechanism using clerk : https://app.itsdart.com/d/BtfCYSAnbFx5/XyLNeDJ39IyI-On-boarding-feauture
    if (hasCompletedFirstTime) {
      setIsFirstTime(false);
    }
  }, []);

  // Update saved resume data when resume data changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      resumeData,
    }));
  }, [resumeData]);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const handleNext = async () => {
    console.log("Form data:", formData);
    const validation = validateStep(currentStep, formData, stepValidations);

    if (!validation.isValid) {
      toast({
        title: validation.message,
        variant: "destructive",
      });
      return;
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      if (isFirstTime && currentStep === 4) {
        localStorage.setItem("hasCompletedFirstTime", "true");
        setIsFirstTime(false);
        toast({
          title: "🎈 Awesome job!",
          description:
            "We've saved your info for future applications. Next time, it'll be even faster! Just upload your resume and go! 🏃‍♂️💨",
        });
      }
    } else {
      //TODO handle submit (resume, jobUrl, extraInformation) : https://app.itsdart.com/d/BtfCYSAnbFx5/FesSRZOEQQqC-handle-submit-resume-job-url
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleResumeDataChange = (data: ResumeData) => {
    setResumeData(data);
    console.log("Resume data updated:", data);
  };

  const renderFirstTimeMessage = () => {
    if (!isFirstTime || (currentStep !== 3 && currentStep !== 4)) return null;

    return (
      <div className="mx-2 sm:mx-0 mb-6 p-4 bg-mint/20 rounded-lg border border-mint text-navy animate-fade-in">
        <p className="text-center">
          🎯 <span className="font-semibold">Pro tip:</span> Don't worry about filling out those boring forms over and over - do
          it once, and we'll remember everything for your future applications! Let's make job hunting fun! 🚀
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto pt-4 sm:pt-12 pb-8 sm:pb-24">
      <h1 className="text-2xl sm:text-4xl font-bold text-navy text-center mb-6 sm:mb-12 px-2 sm:px-4">AI Job Application</h1>

      {renderFirstTimeMessage()}

      <Card className="p-4 sm:p-8 mx-2 sm:mx-0">
        <AnimatePresence mode="wait">
          <WizardSteps
            currentStep={currentStep}
            formData={formData}
            resumeData={resumeData}
            onFormDataChange={setFormData}
            onResumeDataChange={handleResumeDataChange}
            onResumeDataExtracted={handleResumeDataChange}
          />
        </AnimatePresence>
        <WizardNavigation currentStep={currentStep} onNext={handleNext} onBack={handleBack} />
      </Card>
    </div>
  );
};

export default Index;
