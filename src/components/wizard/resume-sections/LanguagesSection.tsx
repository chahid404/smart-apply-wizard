
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResumeData } from "@/types/resume";
import { Languages, Plus, Trash2 } from "lucide-react";

interface LanguagesSectionProps {
  languages: ResumeData["languages"];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof ResumeData["languages"][0], value: string) => void;
  onRemove: (index: number) => void;
}

export const LanguagesSection = ({ languages, onAdd, onUpdate, onRemove }: LanguagesSectionProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-navy">
        <Languages className="h-5 w-5" />
        <h3>Languages</h3>
      </div>
      <div className="space-y-6">
        {languages.map((lang, index) => (
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
                <Label htmlFor={`language-${index}`}>Language</Label>
                <Input
                  id={`language-${index}`}
                  value={lang.name}
                  onChange={(e) => onUpdate(index, "name", e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`proficiency-${index}`}>Proficiency</Label>
                <Select
                  value={lang.proficiency}
                  onValueChange={(value) => onUpdate(index, "proficiency", value)}
                >
                  <SelectTrigger className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors">
                    <SelectValue placeholder="Select proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Fluent">Fluent</SelectItem>
                    <SelectItem value="Native">Native</SelectItem>
                  </SelectContent>
                </Select>
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
          Add Language
        </Button>
      </div>
    </div>
  );
};
