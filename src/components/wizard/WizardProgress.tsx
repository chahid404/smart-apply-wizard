import { Progress } from "@/components/ui/progress";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center gap-4 w-full">
      <Progress value={progress} className="flex-1" />
      <span className="text-sm font-medium text-gray-500">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
}
