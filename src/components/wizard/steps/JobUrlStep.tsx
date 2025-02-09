
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WizardLayout } from "@/components/wizard/WizardLayout";

interface JobUrlStepProps {
  jobUrl: string;
  onJobUrlChange: (url: string) => void;
}

export const JobUrlStep = ({ jobUrl, onJobUrlChange }: JobUrlStepProps) => {
  return (
    <WizardLayout title="Enter Job URL" currentStep={1} totalSteps={4}>
      <div className="space-y-4">
        <div className="space-y-2 py-4">
          <Label htmlFor="jobUrl">Job Posting URL</Label>
          <Input
            id="jobUrl"
            placeholder="https://example.com/job-posting"
            value={jobUrl}
            onChange={(e) => onJobUrlChange(e.target.value)}
          />
        </div>
      </div>
    </WizardLayout>
  );
};
