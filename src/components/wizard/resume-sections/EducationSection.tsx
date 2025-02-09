
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/types/resume";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface EducationSectionProps {
  education: ResumeData["education"];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof ResumeData["education"][0], value: string) => void;
  onRemove: (index: number) => void;
}

export const EducationSection = ({ education, onAdd, onUpdate, onRemove }: EducationSectionProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-navy">
        <GraduationCap className="h-5 w-5" />
        <h3>Education</h3>
      </div>
      <div className="space-y-6">
        {education.map((edu, index) => (
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
                <Label htmlFor={`institution-${index}`}>Institution</Label>
                <Input
                  id={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => onUpdate(index, "institution", e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${index}`}>Degree</Label>
                <Input 
                  id={`degree-${index}`} 
                  value={edu.degree} 
                  onChange={(e) => onUpdate(index, "degree", e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`field-${index}`}>Field of Study</Label>
                <Input 
                  id={`field-${index}`} 
                  value={edu.field} 
                  onChange={(e) => onUpdate(index, "field", e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`graduation-${index}`}>Graduation Date</Label>
                <Input
                  id={`graduation-${index}`}
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => onUpdate(index, "graduationDate", e.target.value)}
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
          Add Education
        </Button>
      </div>
    </div>
  );
};
