import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/wizard/FileUpload";
import { ResumeForm } from "@/components/wizard/ResumeForm";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { AdditionalCandidateInfo, ResumeData } from "@/types/resume";

interface WizardStepsProps {
  currentStep: number;
  formData: {
    jobUrl: string;
    resume: File | null;
    candidateInfo?: AdditionalCandidateInfo;
    withExtraUserDetails: boolean;
    extraUserDetails: string;
  };
  resumeData: ResumeData | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFormDataChange: (data: any) => void;
  onResumeDataChange: (data: ResumeData) => void;
  onResumeDataExtracted: (data: ResumeData) => void;
}

export const WizardSteps = ({ currentStep, formData, resumeData, onFormDataChange, onResumeDataChange, onResumeDataExtracted }: WizardStepsProps) => {
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
            </div>
          </WizardLayout>
        );
      case 3:
        return (
          <WizardLayout title="Personal Information" currentStep={currentStep} totalSteps={4}>
            {resumeData ? (
              <ResumeForm resumeData={resumeData} onChange={onResumeDataChange} />
            ) : (
              <div className="text-center py-8 text-gray-500">No resume data available. Please upload a resume in the previous step.</div>
            )}
          </WizardLayout>
        );
      case 4:
        return (
          <WizardLayout title="Additional Information" currentStep={currentStep} totalSteps={5}>
            <div className="space-y-8">
              <div className="space-y-6 py-4">
                {/* Visa Status Section */}
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-4">Work Authorization</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 bg-sand/50 rounded-md p-3 transition-colors hover:bg-sand">
                      <Checkbox
                        id="visaEurope"
                        checked={formData.candidateInfo?.visaStatus.europe}
                        onCheckedChange={(checked) =>
                          onFormDataChange({
                            ...formData,
                            candidateInfo: {
                              ...formData.candidateInfo,
                              visaStatus: {
                                ...formData.candidateInfo?.visaStatus,
                                europe: checked,
                              },
                            },
                          })
                        }
                      />
                      <Label htmlFor="visaEurope" className="cursor-pointer">Valid Visa for Europe</Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-sand/50 rounded-md p-3 transition-colors hover:bg-sand">
                      <Checkbox
                        id="visaUSA"
                        checked={formData.candidateInfo?.visaStatus.usa}
                        onCheckedChange={(checked) =>
                          onFormDataChange({
                            ...formData,
                            candidateInfo: {
                              ...formData.candidateInfo,
                              visaStatus: {
                                ...formData.candidateInfo?.visaStatus,
                                usa: checked,
                              },
                            },
                          })
                        }
                      />
                      <Label htmlFor="visaUSA" className="cursor-pointer">Valid Visa for USA</Label>
                    </div>
                  </div>
                </div>

                {/* Availability Section */}
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-4">Availability & Flexibility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 bg-sand/50 rounded-md p-3 transition-colors hover:bg-sand">
                      <Checkbox
                        id="availableToTravel"
                        checked={formData.candidateInfo?.availableToTravel}
                        onCheckedChange={(checked) =>
                          onFormDataChange({
                            ...formData,
                            candidateInfo: {
                              ...formData.candidateInfo,
                              availableToTravel: checked as boolean,
                            },
                          })
                        }
                      />
                      <Label htmlFor="availableToTravel" className="cursor-pointer">Available to Travel</Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-sand/50 rounded-md p-3 transition-colors hover:bg-sand">
                      <Checkbox
                        id="willingToRelocate"
                        checked={formData.candidateInfo?.willingToRelocate}
                        onCheckedChange={(checked) =>
                          onFormDataChange({
                            ...formData,
                            candidateInfo: {
                              ...formData.candidateInfo,
                              willingToRelocate: checked as boolean,
                            },
                          })
                        }
                      />
                      <Label htmlFor="willingToRelocate" className="cursor-pointer">Willing to Relocate</Label>
                    </div>
                  </div>
                </div>

                {/* Employment Details Section */}
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-4">Employment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="noticePeriod">Notice Period</Label>
                      <Input
                        id="noticePeriod"
                        placeholder="e.g., 2 months"
                        className="bg-white/70"
                        value={formData.candidateInfo?.noticePeriod || ""}
                        onChange={(e) =>
                          onFormDataChange({
                            ...formData,
                            candidateInfo: {
                              ...formData.candidateInfo,
                              noticePeriod: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                      <Input
                        id="salaryExpectation"
                        placeholder="e.g., $80,000 - $100,000"
                        className="bg-white/70"
                        value={formData.candidateInfo?.salaryExpectation || ""}
                        onChange={(e) =>
                          onFormDataChange({
                            ...formData,
                            candidateInfo: {
                              ...formData.candidateInfo,
                              salaryExpectation: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Preferences Section */}
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-4">Personal Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-base">Gender</Label>
                      <RadioGroup
                        value={formData.candidateInfo?.gender || "prefer_not_to_say"}
                        onValueChange={(value) =>
                          onFormDataChange({
                            ...formData,
                            candidateInfo: {
                              ...formData.candidateInfo,
                              gender: value,
                            },
                          })
                        }
                        className="flex flex-col space-y-2"
                      >
                        {[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                          { value: "other", label: "Other" },
                          { value: "prefer_not_to_say", label: "Prefer not to say" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-3 bg-sand/50 rounded-md p-3 transition-colors hover:bg-sand">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base">Work Preference</Label>
                      <RadioGroup
                        value={formData.candidateInfo?.workPreference || "onsite"}
                        onValueChange={(value) =>
                          onFormDataChange({
                            ...formData,
                            candidateInfo: {
                              ...formData.candidateInfo,
                              workPreference: value,
                            },
                          })
                        }
                        className="flex flex-col space-y-2"
                      >
                        {[
                          { value: "remote", label: "Remote" },
                          { value: "hybrid", label: "Hybrid" },
                          { value: "onsite", label: "On-site" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-3 bg-sand/50 rounded-md p-3 transition-colors hover:bg-sand">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Employment Status Section */}
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-4">Current Employment Status</h3>
                  <RadioGroup
                    value={formData.candidateInfo?.currentEmploymentStatus || "employed"}
                    onValueChange={(value) =>
                      onFormDataChange({
                        ...formData,
                        candidateInfo: {
                          ...formData.candidateInfo,
                          currentEmploymentStatus: value,
                        },
                      })
                    }
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {[
                      { value: "employed", label: "Employed" },
                      { value: "unemployed", label: "Unemployed" },
                      { value: "freelancer", label: "Freelancer" },
                      { value: "student", label: "Student" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 bg-sand/50 rounded-md p-3 transition-colors hover:bg-sand">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Additional Details Section */}
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-4">Additional Details</h3>
                  <div className="space-y-2">
                    <Label>Tell us more about yourself</Label>
                    <Textarea
                      placeholder="Share additional details about your skills, experience, or anything else you'd like us to know..."
                      value={formData.extraUserDetails}
                      onChange={(e) => onFormDataChange({ ...formData, extraUserDetails: e.target.value })}
                      className="h-48 bg-white/70"
                    />
                  </div>
                </div>
              </div>
            </div>
          </WizardLayout>
        );
      case 5:
        return (
          <WizardLayout title="Review Application" currentStep={currentStep} totalSteps={5}>
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
              {formData.candidateInfo && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-navy">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Visa Status</h4>
                      <ul className="list-disc list-inside text-navy">
                        {formData.candidateInfo.visaStatus.europe && <li>Valid Visa for Europe</li>}
                        {formData.candidateInfo.visaStatus.usa && <li>Valid Visa for USA</li>}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Notice Period</h4>
                      <p className="text-navy">{formData.candidateInfo.noticePeriod}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Salary Expectation</h4>
                      <p className="text-navy">{formData.candidateInfo.salaryExpectation}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Work Preference</h4>
                      <p className="text-navy capitalize">{formData.candidateInfo.workPreference}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Employment Status</h4>
                      <p className="text-navy capitalize">{formData.candidateInfo.currentEmploymentStatus}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Additional Details</h4>
                      <ul className="list-disc list-inside text-navy">
                        {formData.candidateInfo.availableToTravel && <li>Available to Travel</li>}
                        {formData.candidateInfo.willingToRelocate && <li>Willing to Relocate</li>}
                      </ul>
                    </div>
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