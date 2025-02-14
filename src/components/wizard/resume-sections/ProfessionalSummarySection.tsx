
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";

interface ProfessionalSummarySectionProps {
  summary: string;
  onUpdate: (summary: string) => void;
}

export const ProfessionalSummarySection = ({ summary, onUpdate }: ProfessionalSummarySectionProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-navy">
        <Briefcase className="h-5 w-5" />
        <h3>Professional Summary</h3>
      </div>
      <Textarea 
        value={summary} 
        onChange={(e) => onUpdate(e.target.value)} 
        className="min-h-[100px] bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
      />
    </div>
  );
};
