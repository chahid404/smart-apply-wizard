
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Trash2 } from "lucide-react";

interface SkillsSectionProps {
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}

export const SkillsSection = ({ skills, onAdd, onRemove }: SkillsSectionProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-navy">
        <Sparkles className="h-5 w-5" />
        <h3>Skills</h3>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-1 bg-white/70 hover:bg-white/90 cursor-pointer group"
              onClick={() => onRemove(skill)}
            >
              {skill}
              <Trash2 className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-block" />
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a new skill"
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onAdd((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          <Button
            type="button"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              onAdd(input.value);
              input.value = '';
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
