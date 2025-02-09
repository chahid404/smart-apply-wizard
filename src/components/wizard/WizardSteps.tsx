
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/wizard/FileUpload";
import { ResumeForm } from "@/components/wizard/ResumeForm";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { ExtraInformation, ResumeData } from "@/types/resume";
import { BadgeCheck, Briefcase, Building2, FileCheck, Globe2, MapPin } from "lucide-react";

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
          <WizardLayout title="Additional Information" currentStep={currentStep} totalSteps={4}>
            <div className="space-y-8">
              {/* Basic Information Section */}
              <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
                <div className="flex items-center gap-2 text-lg font-semibold text-navy">
                  <Briefcase className="h-5 w-5" />
                  <h3>Basic Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="noticePeriod">Notice Period</Label>
                    <Input
                      id="noticePeriod"
                      placeholder="e.g., 2 months"
                      value={formData.extraInformation.noticePeriod}
                      onChange={(e) =>
                        onFormDataChange({
                          ...formData,
                          extraInformation: {
                            ...formData.extraInformation,
                            noticePeriod: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryRangeUsd">Salary Expectation (USD)</Label>
                    <Input
                      id="salaryRangeUsd"
                      placeholder="e.g., $80,000 - $100,000"
                      value={formData.extraInformation.salaryExpectations.salaryRangeUsd}
                      onChange={(e) =>
                        onFormDataChange({
                          ...formData,
                          extraInformation: {
                            ...formData.extraInformation,
                            salaryExpectations: {
                              salaryRangeUsd: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Work Authorization Section */}
              <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
                <div className="flex items-center gap-2 text-lg font-semibold text-navy">
                  <Globe2 className="h-5 w-5" />
                  <h3>Work Authorization</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Current Authorization */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Current Authorization</h4>
                    {[
                      { id: "euWorkAuthorization", label: "EU Work Authorization" },
                      { id: "usWorkAuthorization", label: "US Work Authorization" },
                      { id: "canadaWorkAuthorization", label: "Canada Work Authorization" },
                      { id: "ukWorkAuthorization", label: "UK Work Authorization" },
                    ].map((auth) => (
                      <div
                        key={auth.id}
                        className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors"
                      >
                        <Checkbox
                          id={auth.id}
                          checked={formData.extraInformation.legalAuthorization[auth.id as keyof typeof formData.extraInformation.legalAuthorization]}
                          onCheckedChange={(checked) =>
                            onFormDataChange({
                              ...formData,
                              extraInformation: {
                                ...formData.extraInformation,
                                legalAuthorization: {
                                  ...formData.extraInformation.legalAuthorization,
                                  [auth.id]: checked,
                                },
                              },
                            })
                          }
                        />
                        <Label htmlFor={auth.id} className="cursor-pointer">
                          {auth.label}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {/* Visa Requirements */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Visa & Sponsorship Requirements</h4>
                    {[
                      { id: "requiresUsVisa", label: "Requires US Visa" },
                      { id: "requiresUsSponsorship", label: "Requires US Sponsorship" },
                      { id: "requiresEuVisa", label: "Requires EU Visa" },
                      { id: "requiresEuSponsorship", label: "Requires EU Sponsorship" },
                      { id: "requiresCanadaVisa", label: "Requires Canada Visa" },
                      { id: "requiresCanadaSponsorship", label: "Requires Canada Sponsorship" },
                      { id: "requiresUkVisa", label: "Requires UK Visa" },
                      { id: "requiresUkSponsorship", label: "Requires UK Sponsorship" },
                    ].map((req) => (
                      <div
                        key={req.id}
                        className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors"
                      >
                        <Checkbox
                          id={req.id}
                          checked={formData.extraInformation.legalAuthorization[req.id as keyof typeof formData.extraInformation.legalAuthorization]}
                          onCheckedChange={(checked) =>
                            onFormDataChange({
                              ...formData,
                              extraInformation: {
                                ...formData.extraInformation,
                                legalAuthorization: {
                                  ...formData.extraInformation.legalAuthorization,
                                  [req.id]: checked,
                                },
                              },
                            })
                          }
                        />
                        <Label htmlFor={req.id} className="cursor-pointer">
                          {req.label}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {/* Legal Work Status */}
                  <div className="space-y-4 md:col-span-2">
                    <h4 className="font-medium">Legal Work Status</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: "legallyAllowedToWorkInEu", label: "Legally Allowed to Work in EU" },
                        { id: "legallyAllowedToWorkInUs", label: "Legally Allowed to Work in US" },
                        { id: "legallyAllowedToWorkInCanada", label: "Legally Allowed to Work in Canada" },
                        { id: "legallyAllowedToWorkInUk", label: "Legally Allowed to Work in UK" },
                      ].map((status) => (
                        <div
                          key={status.id}
                          className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors"
                        >
                          <Checkbox
                            id={status.id}
                            checked={
                              formData.extraInformation.legalAuthorization[status.id as keyof typeof formData.extraInformation.legalAuthorization]
                            }
                            onCheckedChange={(checked) =>
                              onFormDataChange({
                                ...formData,
                                extraInformation: {
                                  ...formData.extraInformation,
                                  legalAuthorization: {
                                    ...formData.extraInformation.legalAuthorization,
                                    [status.id]: checked,
                                  },
                                },
                              })
                            }
                          />
                          <Label htmlFor={status.id} className="cursor-pointer">
                            {status.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Preferences Section */}
              <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
                <div className="flex items-center gap-2 text-lg font-semibold text-navy">
                  <Building2 className="h-5 w-5" />
                  <h3>Work Preferences</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Work Model</h4>
                    {[
                      { id: "remoteWork", label: "Remote Work" },
                      { id: "inPersonWork", label: "In-Person Work" },
                      { id: "openToRelocation", label: "Open to Relocation" },
                    ].map((pref) => (
                      <div
                        key={pref.id}
                        className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors"
                      >
                        <Checkbox
                          id={pref.id}
                          checked={formData.extraInformation.workPreferences[pref.id as keyof typeof formData.extraInformation.workPreferences]}
                          onCheckedChange={(checked) =>
                            onFormDataChange({
                              ...formData,
                              extraInformation: {
                                ...formData.extraInformation,
                                workPreferences: {
                                  ...formData.extraInformation.workPreferences,
                                  [pref.id]: checked,
                                },
                              },
                            })
                          }
                        />
                        <Label htmlFor={pref.id} className="cursor-pointer">
                          {pref.label}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Additional Requirements</h4>
                    {[
                      { id: "willingToCompleteAssessments", label: "Willing to Complete Assessments" },
                      { id: "willingToUndergoDrugTests", label: "Willing to Undergo Drug Tests" },
                      { id: "willingToUndergoBackgroundChecks", label: "Willing to Undergo Background Checks" },
                    ].map((req) => (
                      <div
                        key={req.id}
                        className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors"
                      >
                        <Checkbox
                          id={req.id}
                          checked={formData.extraInformation.workPreferences[req.id as keyof typeof formData.extraInformation.workPreferences]}
                          onCheckedChange={(checked) =>
                            onFormDataChange({
                              ...formData,
                              extraInformation: {
                                ...formData.extraInformation,
                                workPreferences: {
                                  ...formData.extraInformation.workPreferences,
                                  [req.id]: checked,
                                },
                              },
                            })
                          }
                        />
                        <Label htmlFor={req.id} className="cursor-pointer">
                          {req.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Details Section */}
              <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
                <div className="flex items-center gap-2 text-lg font-semibold text-navy">
                  <FileCheck className="h-5 w-5" />
                  <h3>Additional Details</h3>
                </div>
                <div className="space-y-4">
                  <Label>Tell us more about yourself</Label>
                  <Textarea
                    placeholder="Share additional details about your skills, experience, or anything else you'd like us to know..."
                    value={formData.extraInformation.extraDetails}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        extraInformation: {
                          ...formData.extraInformation,
                          extraDetails: e.target.value,
                        },
                      })
                    }
                    className="min-h-[150px]"
                  />
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
              {formData.extraInformation && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-navy">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Notice Period</h4>
                      <p className="text-navy">{formData.extraInformation.noticePeriod}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Salary Expectation</h4>
                      <p className="text-navy">{formData.extraInformation.salaryExpectations.salaryRangeUsd}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Work Authorization</h4>
                      <ul className="list-disc list-inside text-navy">
                        {Object.entries(formData.extraInformation.legalAuthorization)
                          .filter(([, value]) => value)
                          .map(([key]) => (
                            <li key={key}>{key.split(/(?=[A-Z])/).join(" ")}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Work Preferences</h4>
                      <ul className="list-disc list-inside text-navy">
                        {Object.entries(formData.extraInformation.workPreferences)
                          .filter(([, value]) => value)
                          .map(([key]) => (
                            <li key={key}>{key.split(/(?=[A-Z])/).join(" ")}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  {formData.extraInformation.extraDetails && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Additional Details</h4>
                      <p className="text-navy whitespace-pre-wrap">{formData.extraInformation.extraDetails}</p>
                    </div>
                  )}
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
