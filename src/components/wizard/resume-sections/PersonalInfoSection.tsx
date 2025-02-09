
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface PersonalInfoSectionProps {
  personalInfo: ResumeData["personalInfo"];
  onUpdate: (field: keyof ResumeData["personalInfo"], value: string) => void;
}

export const PersonalInfoSection = ({ personalInfo, onUpdate }: PersonalInfoSectionProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-navy">
        <User className="h-5 w-5" />
        <h3>Personal Information</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            value={personalInfo.fullName} 
            onChange={(e) => onUpdate("fullName", e.target.value)}
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={personalInfo.email} 
            onChange={(e) => onUpdate("email", e.target.value)}
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            value={personalInfo.phone} 
            onChange={(e) => onUpdate("phone", e.target.value)}
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={personalInfo.address} 
            onChange={(e) => onUpdate("address", e.target.value)}
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input 
            id="linkedin" 
            value={personalInfo.linkedIn} 
            onChange={(e) => onUpdate("linkedIn", e.target.value)}
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
