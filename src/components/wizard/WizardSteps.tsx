import { WizardLayout } from "@/components/wizard/WizardLayout";
import { FileUpload } from "@/components/wizard/FileUpload";
import { ResumeForm } from "@/components/wizard/ResumeForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ResumeData } from "@/types/resume";

interface WizardStepsProps {
  currentStep: number;
  formData: {
    jobUrl: string;
    resume: File | null;
    withExtraUserDetails: boolean;
    extraUserDetails: string;
  };
  resumeData: ResumeData | null;
  onFormDataChange: (data: any) => void;
  onResumeDataChange: (data: ResumeData) => void;
  onResumeDataExtracted: (data: ResumeData) => void;
}

export const WizardSteps = ({
  currentStep,
  formData,
  resumeData,
  onFormDataChange,
  onResumeDataChange,
  onResumeDataExtracted,
}: WizardStepsProps) => {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WizardLayout title="Enter Job URL" currentStep={currentStep} totalSteps={4}>
            <div className="space-y-4">
              <div className="space-y-2 py-4">
                <Label htmlFor="jobUrl">Job Posting URL</Label>
                <Input
                  id="jobUrl"
                  placeholder="https://example.com/job-posting"
                  value={formData.jobUrl}
                  onChange={(e) => onFormDataChange({ ...formData, jobUrl: e.target.value })}
                />
              </div>
            </div>
          </WizardLayout>
        );
      case 2:
        return (
          <WizardLayout title="Upload Resume & Generate Cover Letter" currentStep={currentStep} totalSteps={4}>
            <div className="space-y-8">
              <div className="space-y-2 py-4">
                <Label>Resume</Label>
                <FileUpload
                  selectedFile={formData.resume}
                  onFileSelect={(file) => onFormDataChange({ ...formData, resume: file })}
                  onResumeDataExtracted={onResumeDataExtracted}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="extra-user-details"
                    checked={formData.withExtraUserDetails}
                    onCheckedChange={(checked) =>
                      onFormDataChange({ ...formData, withExtraUserDetails: checked })
                    }
                  />
                  <Label htmlFor="extra-user-details">Add extra details about yourself</Label>
                </div>
                {formData.withExtraUserDetails && (
                  <Textarea
                    placeholder="Give us extra details about yourself, your skills, and your experience..."
                    value={formData.extraUserDetails}
                    onChange={(e) =>
                      onFormDataChange({ ...formData, extraUserDetails: e.target.value })
                    }
                    className="h-48"
                  />
                )}
              </div>
            </div>
          </WizardLayout>
        );
      case 3:
        return (
          <WizardLayout title="Personal Information" currentStep={currentStep} totalSteps={4}>
            {resumeData ? (
              <ResumeForm resumeData={resumeData} onChange={onResumeDataChange} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No resume data available. Please upload a resume in the previous step.
              </div>
            )}
          </WizardLayout>
        );
      case 4:
        return (
          <WizardLayout title="Review Application" currentStep={currentStep} totalSteps={4}>
            <div className="space-y-6">
              <div className="space-y-2 py-4">
                <h3 className="text-sm font-medium text-gray-500">Job URL</h3>
                <p className="text-navy">{formData.jobUrl}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Resume</h3>
                <p className="text-navy">{formData.resume?.name}</p>
              </div>
              {formData.withExtraUserDetails && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Additional Details</h3>
                  <p className="text-navy whitespace-pre-wrap">{formData.extraUserDetails}</p>
                </div>
              )}
              {resumeData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="text-navy">{resumeData.personalInfo.fullName}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-navy">{resumeData.personalInfo.email}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-navy">{resumeData.personalInfo.phone || "Not provided"}</p>
                  </div>
                </div>
              )}
            </div>
          </WizardLayout>
        );
      default:
        return null;
    }
  };

  return renderStep();
};