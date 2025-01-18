import { ReactNode } from "react";
import { motion } from "framer-motion";

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
      className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8"
    >
      <h2 className="text-2xl font-semibold text-navy mb-6">{title}</h2>
      {children}
    </motion.div>
  );
};