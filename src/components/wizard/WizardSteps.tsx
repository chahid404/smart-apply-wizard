import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
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
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="extra-user-details"
                    checked={formData.withExtraUserDetails}
                    onCheckedChange={(checked) => onFormDataChange({ ...formData, withExtraUserDetails: checked })}
                  />
                  <Label htmlFor="extra-user-details">Add extra details about yourself</Label>
                </div>
                {formData.withExtraUserDetails && (
                  <Textarea
                    placeholder="Give us extra details about yourself, your skills, and your experience..."
                    value={formData.extraUserDetails}
                    onChange={(e) => onFormDataChange({ ...formData, extraUserDetails: e.target.value })}
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
              <div className="text-center py-8 text-gray-500">No resume data available. Please upload a resume in the previous step.</div>
            )}
          </WizardLayout>
        );
      case 4:
        return (
          <WizardLayout title="Additional Information" currentStep={currentStep} totalSteps={5}>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Visa Status</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center space-x-2">
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
                      <Label htmlFor="visaEurope">Valid Visa for Europe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
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
                      <Label htmlFor="visaUSA">Valid Visa for USA</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="noticePeriod">Notice Period</Label>
                  <Input
                    id="noticePeriod"
                    placeholder="e.g., 2 months"
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

                <div className="space-y-2">
                  <Label>Gender</Label>
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
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer_not_to_say" id="prefer_not_to_say" />
                      <Label htmlFor="prefer_not_to_say">Prefer not to say</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Work Preference</Label>
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
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="remote" id="remote" />
                      <Label htmlFor="remote">Remote</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid">Hybrid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onsite" id="onsite" />
                      <Label htmlFor="onsite">On-site</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
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
                  <Label htmlFor="availableToTravel">Available to Travel</Label>
                </div>

                <div className="flex items-center space-x-2">
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
                  <Label htmlFor="willingToRelocate">Willing to Relocate</Label>
                </div>

                <div className="space-y-2">
                  <Label>Employment Status</Label>
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
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="employed" id="employed" />
                      <Label htmlFor="employed">Employed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unemployed" id="unemployed" />
                      <Label htmlFor="unemployed">Unemployed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="freelancer" id="freelancer" />
                      <Label htmlFor="freelancer">Freelancer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Student</Label>
                    </div>
                  </RadioGroup>
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
