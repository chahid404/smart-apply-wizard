import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/types/resume";
import { Link2 } from "lucide-react";

interface SocialMediaSectionProps {
  personalInfo: ResumeData["personalInfo"];
  onUpdate: (field: "linkedIn" | "github" | "portfolio", value: string) => void;
}

export const SocialMediaSection = ({ personalInfo, onUpdate }: SocialMediaSectionProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-navy">
        <Link2 className="h-5 w-5" />
        <h3>Social Media Profiles</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedIn}
            onChange={(e) => onUpdate("linkedIn", e.target.value)}
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub Profile</Label>
          <Input
            id="github"
            value={personalInfo.github || ""}
            onChange={(e) => onUpdate("github", e.target.value)}
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio Link</Label>
          <Input
            id="portfolio"
            value={personalInfo.portfolio || ""}
            onChange={(e) => onUpdate("portfolio", e.target.value)}
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
