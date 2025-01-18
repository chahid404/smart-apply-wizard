import { cn } from "@/lib/utils";

interface WizardProgressProps {
  currentStep: number;
  steps: string[];
}

export const WizardProgress = ({ currentStep, steps }: WizardProgressProps) => {
  return (
    <div className="w-full mb-8">
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                index < currentStep
                  ? "bg-mint text-white"
                  : index === currentStep
                  ? "bg-navy text-white"
                  : "bg-sand-dark text-navy"
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "mt-2 text-xs sm:text-sm transition-colors duration-300 hidden sm:block",
                index <= currentStep ? "text-navy" : "text-gray-400"
              )}
            >
              {step}
            </span>
          </div>
        ))}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-sand-dark -z-10">
          <div
            className="absolute top-0 left-0 h-full bg-mint transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};