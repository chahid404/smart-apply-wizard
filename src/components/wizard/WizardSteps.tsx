/* eslint-disable @typescript-eslint/no-explicit-any */

import { JobUrlStep } from "@/components/wizard/steps/JobUrlStep";
import { ResumeStep } from "@/components/wizard/steps/ResumeStep";
import { PersonalInfoStep } from "@/components/wizard/steps/PersonalInfoStep";
import { AdditionalInfoStep } from "@/components/wizard/steps/AdditionalInfoStep";
import { ReviewStep } from "@/components/wizard/steps/ReviewStep";
import { ExtraInformation, ResumeData } from "@/types/resume";

interface WizardStepsProps {
  currentStep: number;
  formData: {
    jobUrl: string;
    resume: File | null;
    extraInformation: ExtraInformation;
  };
  resumeData: ResumeData | null;
  onFormDataChange: (data: any) => void;
  onResumeDataChange: (data: ResumeData) => void;
  onResumeDataExtracted: (data: ResumeData) => void;
}

export const WizardSteps = ({ currentStep, formData, resumeData, onFormDataChange, onResumeDataChange, onResumeDataExtracted }: WizardStepsProps) => {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <JobUrlStep jobUrl={formData.jobUrl} onJobUrlChange={(jobUrl) => onFormDataChange({ ...formData, jobUrl })} />;
      case 2:
        return (
          <ResumeStep
            selectedFile={formData.resume}
            onFileSelect={(file) => onFormDataChange({ ...formData, resume: file })}
            onResumeDataExtracted={onResumeDataExtracted}
          />
        );
      case 3:
        return <PersonalInfoStep resumeData={resumeData} onChange={onResumeDataChange} />;
      case 4:
        return (
          <AdditionalInfoStep
            extraInformation={formData.extraInformation}
            onExtraInformationChange={(extraInformation) =>
              onFormDataChange({
                ...formData,
                extraInformation,
              })
            }
          />
        );
      case 5:
        return <ReviewStep jobUrl={formData.jobUrl} resume={formData.resume} resumeData={resumeData} extraInformation={formData.extraInformation} />;
      default:
        return null;
    }
  };

  return renderStep();
};
