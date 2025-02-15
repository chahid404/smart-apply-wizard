import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { ExtraInformation } from "@/types/resume";
import { Briefcase, Building2, FileCheck, Globe2 } from "lucide-react";

interface AdditionalInfoStepProps {
  extraInformation: ExtraInformation;
  onExtraInformationChange: (data: ExtraInformation) => void;
}

export const AdditionalInfoStep = ({ extraInformation, onExtraInformationChange }: AdditionalInfoStepProps) => {
  return (
    <WizardLayout title="Additional Information" currentStep={4} totalSteps={4}>
      <div className="space-y-6 mt-8">
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
                className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                value={extraInformation.noticePeriod}
                onChange={(e) =>
                  onExtraInformationChange({
                    ...extraInformation,
                    noticePeriod: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryRangeUsd">Salary Expectation (USD)</Label>
              <Input
                id="salaryRangeUsd"
                placeholder="e.g., $80,000 - $100,000"
                className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                value={extraInformation.salaryExpectations.salaryRangeUsd}
                onChange={(e) =>
                  onExtraInformationChange({
                    ...extraInformation,
                    salaryExpectations: {
                      salaryRangeUsd: e.target.value,
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
                <div key={auth.id} className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors">
                  <Checkbox
                    id={auth.id}
                    checked={extraInformation.legalAuthorization[auth.id as keyof typeof extraInformation.legalAuthorization]}
                    onCheckedChange={(checked) =>
                      onExtraInformationChange({
                        ...extraInformation,
                        legalAuthorization: {
                          ...extraInformation.legalAuthorization,
                          [auth.id]: checked,
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
                <div key={req.id} className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors">
                  <Checkbox
                    id={req.id}
                    checked={extraInformation.legalAuthorization[req.id as keyof typeof extraInformation.legalAuthorization]}
                    onCheckedChange={(checked) =>
                      onExtraInformationChange({
                        ...extraInformation,
                        legalAuthorization: {
                          ...extraInformation.legalAuthorization,
                          [req.id]: checked,
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
                  <div key={status.id} className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors">
                    <Checkbox
                      id={status.id}
                      checked={extraInformation.legalAuthorization[status.id as keyof typeof extraInformation.legalAuthorization]}
                      onCheckedChange={(checked) =>
                        onExtraInformationChange({
                          ...extraInformation,
                          legalAuthorization: {
                            ...extraInformation.legalAuthorization,
                            [status.id]: checked,
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
                <div key={pref.id} className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors">
                  <Checkbox
                    id={pref.id}
                    checked={extraInformation.workPreferences[pref.id as keyof typeof extraInformation.workPreferences]}
                    onCheckedChange={(checked) =>
                      onExtraInformationChange({
                        ...extraInformation,
                        workPreferences: {
                          ...extraInformation.workPreferences,
                          [pref.id]: checked,
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
                <div key={req.id} className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg hover:bg-white/70 transition-colors">
                  <Checkbox
                    id={req.id}
                    checked={extraInformation.workPreferences[req.id as keyof typeof extraInformation.workPreferences]}
                    onCheckedChange={(checked) =>
                      onExtraInformationChange({
                        ...extraInformation,
                        workPreferences: {
                          ...extraInformation.workPreferences,
                          [req.id]: checked,
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
              className="min-h-[150px] bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
              value={extraInformation.extraDetails}
              onChange={(e) =>
                onExtraInformationChange({
                  ...extraInformation,
                  extraDetails: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </WizardLayout>
  );
};
