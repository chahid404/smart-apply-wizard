/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { WizardSteps } from "@/components/wizard/WizardSteps";
import { ExtraInformation, ResumeData } from "@/types/resume";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

enum FieldType {
  STRING = "string",
  EMAIL = "email",
  URL = "url",
  FILE = "file",
  NUMBER = "number",
  ADDRESS = "address",
  OBJECT = "object",
}
interface ValidationResult {
  isValid: boolean;
  message?: string;
}

interface FieldValidation {
  field: string; // Dot notation path, e.g., "savedResumeData.personalInfo.email"
  required?: boolean;
  type?: FieldType;
  customValidate?: (value: any, formData?: any) => boolean;
  message?: string;
}

interface StepValidation {
  validations: FieldValidation[];
}

// Helper to get nested value from an object given a dot-separated path
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
};

// Field validator that checks required, type, and custom validations
const validateField = (formData: any, fieldValidation: FieldValidation): ValidationResult => {
  const value = getNestedValue(formData, fieldValidation.field);

  // Required check
  if (fieldValidation.required && (value === null || value === undefined || value === "")) {
    return { isValid: false, message: fieldValidation.message || `${fieldValidation.field} is required.` };
  }

  // Only continue if value exists (or not required)
  if (value !== null && value !== undefined && value !== "") {
    if (fieldValidation.type === FieldType.STRING) {
      if (typeof value !== "string" || value.trim() === "") {
        return { isValid: false, message: fieldValidation.message || `${fieldValidation.field} must be a valid string.` };
      }
    }

    if (fieldValidation.type === FieldType.EMAIL) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value !== "string" || !emailPattern.test(value)) {
        return { isValid: false, message: fieldValidation.message || "Please enter a valid email address." };
      }
    }

    if (fieldValidation.type === FieldType.URL) {
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // Optional protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // Domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP address
          "(\\:\\d+)?(\\/[-a-z\\d_.@:%+~#?&/=]*)?" + // Path with expanded character set
          "(\\?[;&a-z\\d_.@:%+~#?&/=]*)?" + // Query string
          "(\\#[-a-z\\d_]*)?$", // Fragment identifier
        "i"
      );
      if (typeof value !== "string" || !urlPattern.test(value)) {
        console.log("urlPattern.test(value)", urlPattern.test(value));

        return { isValid: false, message: fieldValidation.message || "Please enter a valid URL." };
      }
    }

    if (fieldValidation.type === FieldType.FILE) {
      if (!(value instanceof File)) {
        return { isValid: false, message: fieldValidation.message || "Please upload a valid file." };
      }
    }

    if (fieldValidation.type === FieldType.NUMBER) {
      if (typeof value !== "number" || isNaN(value) || value < 0) {
        return { isValid: false, message: fieldValidation.message || `${fieldValidation.field} must be a positive number.` };
      }
    }

    if (fieldValidation.type === FieldType.ADDRESS) {
      if (typeof value !== "object" || !value) {
        return { isValid: false, message: fieldValidation.message || `Invalid value for ${fieldValidation.field}.` };
      }

      if (value.streetAddress.trim() === "") {
        return { isValid: false, message: "Street address is required." };
      }

      if (value.city.trim() === "") {
        return { isValid: false, message: "City is required." };
      }

      if (value.state.trim() === "") {
        return { isValid: false, message: "State is required." };
      }

      if (value.zipCode.trim() === "") {
        return { isValid: false, message: "Zip code is required." };
      }

      if (value.country.trim() === "") {
        return { isValid: false, message: "Country is required." };
      }

      if (fieldValidation.customValidate && !fieldValidation.customValidate(value, formData)) {
        return { isValid: false, message: fieldValidation.message || `Invalid value for ${fieldValidation.field}.` };
      }
    }
    // Custom validation if provided
    if (fieldValidation.customValidate && !fieldValidation.customValidate(value, formData)) {
      return { isValid: false, message: fieldValidation.message || `Invalid value for ${fieldValidation.field}.` };
    }
  }

  return { isValid: true };
};

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

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Updated validations for each step with per-field rules
  const stepValidations: Record<number, StepValidation> = {
    1: {
      validations: [
        {
          field: "jobUrl",
          required: true,
          type: FieldType.URL,
          message: "Please enter a valid job URL.",
        },
      ],
    },
    2: {
      validations: [
        {
          field: "resume",
          required: true,
          type: FieldType.FILE,
          message: "Please upload your resume.",
        },
      ],
    },
    3: {
      validations: [
        {
          field: "savedResumeData.personalInfo.firstName",
          required: true,
          type: FieldType.STRING,
          message: "Please enter your first name.",
        },
        {
          field: "savedResumeData.personalInfo.lastName",
          required: true,
          type: FieldType.STRING,
          message: "Please enter your last name.",
        },
        {
          field: "savedResumeData.personalInfo.email",
          required: true,
          type: FieldType.EMAIL,
          message: "Please enter a valid email address.",
        },
        {
          field: "savedResumeData.personalInfo.phoneCode",
          required: true,
          type: FieldType.STRING,
          message: "Please enter your phone code.",
        },
        {
          field: "savedResumeData.personalInfo.phone",
          type: FieldType.STRING,
          customValidate: (value: string, _) => /^\d+$/.test(value),
          message: "Please enter a valid phone number.",
        },
        {
          field: "savedResumeData.personalInfo.gender",
          required: true,
          type: FieldType.STRING,
          message: "Please select your gender.",
        },
        {
          field: "savedResumeData.personalInfo.address",
          required: true,
          type: FieldType.ADDRESS,
          message: "Please enter your complete address.",
        },
        {
          field: "savedResumeData.summary",
          type: FieldType.STRING,
          customValidate: (value: string, _) => value.length > 100,
          message: "Profession summary must be more than 100 characters.",
        },
        {
          field: "savedResumeData.skills",
          customValidate: (value: string[], _) => value.length >= 3,
          message: "Please add at least 3 skills.",
        },
      ],
    },
    4: {
      validations: [
        {
          field: "extraInformation.noticePeriod",
          required: true,
          type: FieldType.STRING,
          message: "Please fill in your notice period.",
        },
        {
          field: "extraInformation.salaryExpectations.salaryRangeUsd",
          required: true,
          type: FieldType.STRING,
          message: "Please fill in your salary expectation.",
        },
      ],
    },
  };

  // Updated helper to validate a step based on its field validations
  const validateStep = (step: number, formData: any): ValidationResult => {
    const stepValidation = stepValidations[step];
    if (!stepValidation) return { isValid: true };

    for (const fieldVal of stepValidation.validations) {
      const result = validateField(formData, fieldVal);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
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
