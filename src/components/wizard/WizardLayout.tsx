import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface WizardLayoutProps {
  children: ReactNode;
  title: string;
}

export const WizardLayout = ({ children, title }: WizardLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-navy mb-6">{title}</h2>
      {children}
    </motion.div>
  );
};