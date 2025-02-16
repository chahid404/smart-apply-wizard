import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/wizard/FileUpload";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { ResumeData } from "@/types/resume";

interface ResumeStepProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onResumeDataExtracted: (data: ResumeData) => void;
}

export const ResumeStep = ({ selectedFile, onFileSelect, onResumeDataExtracted }: ResumeStepProps) => {
  return (
    <WizardLayout title="Upload Resume" currentStep={2} totalSteps={4}>
      <div className="space-y-8">
        <div className="space-y-2 py-4">
          <Label>Resume</Label>
          <FileUpload selectedFile={selectedFile} onFileSelect={onFileSelect} onResumeDataExtracted={onResumeDataExtracted} />
        </div>
      </div>
    </WizardLayout>
  );
};
