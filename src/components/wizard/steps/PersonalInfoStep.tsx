
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
      {resumeData ? (
        <ResumeForm resumeData={resumeData} onChange={onChange} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          No resume data available. Please upload a resume in the previous step.
        </div>
      )}
    </WizardLayout>
  );
};
