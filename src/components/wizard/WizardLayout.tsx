import { motion } from "framer-motion";
import { ReactNode } from "react";
import { WizardProgress } from "./WizardProgress";

interface WizardLayoutProps {
  children: ReactNode;
  title: string;
  currentStep: number;
  totalSteps: number;
}

export const WizardLayout = ({ children, title, currentStep, totalSteps }: WizardLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-[300px]"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-navy mb-6">{title}</h2>
      <WizardProgress currentStep={currentStep} totalSteps={totalSteps} />
      {children}
    </motion.div>
  );
};
