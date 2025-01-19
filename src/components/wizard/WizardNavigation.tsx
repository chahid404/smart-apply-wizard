import { Button } from "@/components/ui/button";

interface WizardNavigationProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
}

export const WizardNavigation = ({ currentStep, onNext, onBack }: WizardNavigationProps) => {
  return (
    <div className="flex justify-end space-x-4 mt-8">
      {currentStep > 1 && (
        <Button variant="outline" onClick={onBack} className="w-24 sm:w-32">
          Back
        </Button>
      )}
      <Button onClick={onNext} className="w-24 sm:w-32 bg-navy hover:bg-navy-light text-white">
        {currentStep === 4 ? "Submit" : "Next"}
      </Button>
    </div>
  );
};