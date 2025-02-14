
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/types/resume";
import { Building2, Plus, Trash2 } from "lucide-react";

interface ExperienceSectionProps {
  experience: ResumeData["experience"];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof ResumeData["experience"][0], value: string | string[]) => void;
  onRemove: (index: number) => void;
}

export const ExperienceSection = ({ experience, onAdd, onUpdate, onRemove }: ExperienceSectionProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-navy">
        <Building2 className="h-5 w-5" />
        <h3>Experience</h3>
      </div>
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg relative bg-white/30 hover:bg-white/40 transition-colors">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 group hover:bg-red-300" 
              onClick={() => onRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`company-${index}`}>Company</Label>
                <Input 
                  id={`company-${index}`} 
                  value={exp.company} 
                  onChange={(e) => onUpdate(index, "company", e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`position-${index}`}>Position</Label>
                <Input 
                  id={`position-${index}`} 
                  value={exp.position} 
                  onChange={(e) => onUpdate(index, "position", e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                <Input
                  id={`startDate-${index}`}
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => onUpdate(index, "startDate", e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <Input
                  id={`endDate-${index}`}
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => onUpdate(index, "endDate", e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={exp.description.join("\n")}
                  onChange={(e) => onUpdate(index, "description", e.target.value.split("\n"))}
                  className="min-h-[100px] bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`techStack-${index}`}>Tech Stack</Label>
                <Input
                  id={`techStack-${index}`}
                  value={exp.techStack?.join(", ")}
                  onChange={(e) => onUpdate(index, "techStack", e.target.value.split(", ").filter(Boolean))}
                  placeholder="Enter technologies separated by commas"
                  className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
        <Button 
          type="button" 
          variant="outline" 
          className="w-full hover:bg-teal-light/10" 
          onClick={onAdd}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>
    </div>
  );
};
