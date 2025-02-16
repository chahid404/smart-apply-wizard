/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { WizardSteps } from "@/components/wizard/WizardSteps";
import { ExtraInformation, ResumeData } from "@/types/resume";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
interface ValidationResult {
  isValid: boolean;
  message?: string;
}

interface StepValidation {
  fields: string[];
  validate: (formData: any) => ValidationResult;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [formData, setFormData] = useState({
    jobUrl: "",
    resume: null as File | null,
    savedResumeData: null as ResumeData | null,
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
  }, [toast]);

  // Update saved resume data when resume data changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      savedResumeData: resumeData,
    }));
  }, [resumeData]);

  // Add effect to scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

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

  const stepValidations: Record<number, StepValidation> = {
    1: {
      fields: ["jobUrl"],
      validate: (formData) => ({
        isValid: formData.jobUrl && isValidUrl(formData.jobUrl),
        message: "Please enter a valid job URL",
      }),
    },
    2: {
      fields: ["resume"],
      validate: (formData) => ({
        isValid: !!formData.resume,
        message: "Please upload your resume",
      }),
    },
    3: {
      fields: ["personalInfo.fullName", "personalInfo.email"],
      validate: (formData) => ({
        isValid: formData.resumeData?.personalInfo.fullName && formData.resumeData?.personalInfo.email,
        message: "Please fill in all required fields",
      }),
    },
    4: {
      fields: ["extraInformation.noticePeriod", "extraInformation.salaryExpectations.salaryRangeUsd"],
      validate: (formData) => ({
        isValid: formData.extraInformation?.noticePeriod && formData.extraInformation?.salaryExpectations.salaryRangeUsd,
        message: "Please fill in notice period and salary expectation",
      }),
    },
  };
  // Helper function to validate a step
  const validateStep = (step: number, formData: any): ValidationResult => {
    const stepValidation = stepValidations[step];
    if (!stepValidation) return { isValid: true };

    return stepValidation.validate(formData);
  };

  // Updated handleNext function
  const handleNext = () => {
    const validation = validateStep(currentStep, formData);

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

  const handleResumeDataChange = (data: ResumeData) => {
    setResumeData(data);
    localStorage.setItem("resumeData", JSON.stringify(data));
  };

  return (
    <div className="max-w-4xl mx-auto pt-4 sm:pt-12 pb-8 sm:pb-24">
      <h1 className="text-2xl sm:text-4xl font-bold text-navy text-center mb-6 sm:mb-12 px-2 sm:px-4">AI Job Application</h1>
      {isFirstTime && (currentStep === 3 || currentStep === 4) && (
        <div className="mx-2 sm:mx-0 mb-6 p-4 bg-mint/20 rounded-lg border border-mint text-navy animate-fade-in">
          <p className="text-center">
            🎯 <span className="font-semibold">Pro tip:</span> Don't worry about filling out those boring forms over and over - do it once, and we'll
            remember everything for your future applications! Let's make job hunting fun! 🚀
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
