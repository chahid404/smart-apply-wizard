import { ResumeForm } from "@/components/wizard/ResumeForm";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { ResumeData } from "@/types/resume";

interface PersonalInfoStepProps {
  resumeData: ResumeData | null;
  onChange: (data: ResumeData) => void;
}

export const PersonalInfoStep = ({ resumeData, onChange }: PersonalInfoStepProps) => {
  return (
    <WizardLayout title="Personal Information" currentStep={3} totalSteps={4}>
      <ResumeForm resumeData={resumeData} onChange={onChange} />
    </WizardLayout>
  );
};
