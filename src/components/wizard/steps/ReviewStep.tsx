import { WizardLayout } from "@/components/wizard/WizardLayout";
import { ExtraInformation, ResumeData } from "@/types/resume";

interface ReviewStepProps {
  jobUrl: string;
  resume: File | null;
  resumeData: ResumeData | null;
  extraInformation: ExtraInformation;
}

export const ReviewStep = ({ jobUrl, resume, resumeData, extraInformation }: ReviewStepProps) => {
  return (
    <WizardLayout title="Review Application" currentStep={5} totalSteps={5}>
      <div className="space-y-6">
        <div className="space-y-2 py-4">
          <h3 className="text-sm font-medium text-gray-500">Job URL</h3>
          <a
            href={jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy hover:underline transition-colors duration-200 hover:text-mint"
          >
            {jobUrl}
          </a>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Resume</h3>
          <p className="text-navy">{resume?.name}</p>
        </div>
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
        {extraInformation && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-navy">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">Notice Period</h4>
                <p className="text-navy">{extraInformation.noticePeriod}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">Salary Expectation</h4>
                <p className="text-navy">{extraInformation.salaryExpectations.salaryRangeUsd}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">Work Authorization</h4>
                <ul className="list-disc list-inside text-navy">
                  {Object.entries(extraInformation.legalAuthorization)
                    .filter(([, value]) => value)
                    .map(([key]) => (
                      <li key={key}>{key.split(/(?=[A-Z])/).join(" ")}</li>
                    ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">Work Preferences</h4>
                <ul className="list-disc list-inside text-navy">
                  {Object.entries(extraInformation.workPreferences)
                    .filter(([, value]) => value)
                    .map(([key]) => (
                      <li key={key}>{key.split(/(?=[A-Z])/).join(" ")}</li>
                    ))}
                </ul>
              </div>
            </div>
            {extraInformation.extraDetails && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">Additional Details</h4>
                <p className="text-navy whitespace-pre-wrap">{extraInformation.extraDetails}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </WizardLayout>
  );
};
