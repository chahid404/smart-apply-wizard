import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const StatusAlert = ({ status, successMessage = "Resume scanned successfully!", errorMessage = "Resume scan failed. Please try again." }) => {
  const variants = {
    success: {
      backgroundColor: "bg-green-100",
      textColor: "text-green-800",
      icon: Check,
      iconColor: "text-green-600",
    },
    error: {
      backgroundColor: "bg-red-100",
      textColor: "text-red-800",
      icon: X,
      iconColor: "text-red-600",
    },
  };

  if (status === null) return null;

  const config = variants[status ? "success" : "error"];
  const Icon = config.icon;
  const message = status ? successMessage : errorMessage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-2 border rounded-lg ${config.backgroundColor} ${config.textColor} space-y-4`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-6 h-6 ${config.iconColor}`} />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </motion.div>
  );
};

export default StatusAlert;
