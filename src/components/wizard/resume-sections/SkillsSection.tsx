import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";

interface SkillsSectionProps {
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}

export const SkillsSection = ({ skills, onAdd, onRemove }: SkillsSectionProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  // Set some initial skills if none exist
  if (skills.length === 0) {
    const initialSkills = ["JavaScript", "React", "TypeScript", "Node.js", "HTML/CSS"];
    initialSkills.forEach((skill) => onAdd(skill));
  }

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 text-lg font-semibold text-navy">
        <Sparkles className="h-5 w-5" />
        <h3>Skills</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new skill (e.g., JavaScript, React)"
            className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button type="button" onClick={handleAddSkill} className="bg-primary hover:bg-primary/90">
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-white/30 rounded-lg border border-dashed border-gray-200">
          {skills.length === 0 ? (
            <div className="w-full text-center text-gray-500 py-8">Add your skills using the input above</div>
          ) : (
            skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 cursor-pointer group transition-all duration-200 animate-in fade-in-0"
                onClick={() => onRemove(skill)}
              >
                {skill}
                <Trash2 className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-block text-gray-500" />
              </Badge>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
