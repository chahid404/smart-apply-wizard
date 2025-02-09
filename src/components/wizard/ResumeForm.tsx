import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/types/resume";
import { Briefcase, Building2, GraduationCap, Languages, Plus, Sparkles, Trash2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResumeFormProps {
  resumeData: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm = ({ resumeData, onChange }: ResumeFormProps) => {
  const updatePersonalInfo = (field: keyof ResumeData["personalInfo"], value: string) => {
    onChange({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const addEducation = () => {
    onChange({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          institution: "",
          degree: "",
          field: "",
          graduationDate: "",
        },
      ],
    });
  };

  const updateEducation = (index: number, field: keyof ResumeData["education"][0], value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    onChange({
      ...resumeData,
      education: newEducation,
    });
  };

  const removeEducation = (index: number) => {
    onChange({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index),
    });
  };

  const addExperience = () => {
    onChange({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: [""],
          techStack: [],
        },
      ],
    });
  };

  const updateExperience = (index: number, field: keyof ResumeData["experience"][0], value: string | string[]) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    onChange({
      ...resumeData,
      experience: newExperience,
    });
  };

  const removeExperience = (index: number) => {
    onChange({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index),
    });
  };

  const addLanguage = () => {
    onChange({
      ...resumeData,
      languages: [
        ...(resumeData.languages || []),
        {
          name: "",
          proficiency: "Basic",
        },
      ],
    });
  };

  const updateLanguage = (index: number, field: keyof ResumeData["languages"][0], value: string) => {
    const newLanguages = [...(resumeData.languages || [])];
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: value,
    };
    onChange({
      ...resumeData,
      languages: newLanguages,
    });
  };

  const removeLanguage = (index: number) => {
    onChange({
      ...resumeData,
      languages: (resumeData.languages || []).filter((_, i) => i !== index),
    });
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      onChange({
        ...resumeData,
        skills: [...resumeData.skills, skill.trim()],
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <div className="space-y-6 mt-8">
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
              value={resumeData.personalInfo.fullName} 
              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={resumeData.personalInfo.email} 
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              value={resumeData.personalInfo.phone} 
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={resumeData.personalInfo.address} 
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input 
              id="linkedin" 
              value={resumeData.personalInfo.linkedIn} 
              onChange={(e) => updatePersonalInfo("linkedIn", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
        <div className="flex items-center gap-2 text-lg font-semibold text-navy">
          <Briefcase className="h-5 w-5" />
          <h3>Professional Summary</h3>
        </div>
        <Textarea 
          value={resumeData.summary} 
          onChange={(e) => onChange({ ...resumeData, summary: e.target.value })} 
          className="min-h-[100px] bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
        />
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
        <div className="flex items-center gap-2 text-lg font-semibold text-navy">
          <GraduationCap className="h-5 w-5" />
          <h3>Education</h3>
        </div>
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg relative bg-white/30 hover:bg-white/40 transition-colors">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2 group hover:bg-red-300" 
                onClick={() => removeEducation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input 
                    id={`degree-${index}`} 
                    value={edu.degree} 
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`field-${index}`}>Field of Study</Label>
                  <Input 
                    id={`field-${index}`} 
                    value={edu.field} 
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                    className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`graduation-${index}`}>Graduation Date</Label>
                  <Input
                    id={`graduation-${index}`}
                    type="month"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(index, "graduationDate", e.target.value)}
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
            onClick={addEducation}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
        <div className="flex items-center gap-2 text-lg font-semibold text-navy">
          <Building2 className="h-5 w-5" />
          <h3>Experience</h3>
        </div>
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg relative bg-white/30 hover:bg-white/40 transition-colors">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2 group hover:bg-red-300" 
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input 
                    id={`company-${index}`} 
                    value={exp.company} 
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input 
                    id={`position-${index}`} 
                    value={exp.position} 
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                    className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                    className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={exp.description.join("\n")}
                    onChange={(e) => updateExperience(index, "description", e.target.value.split("\n"))}
                    className="min-h-[100px] bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`techStack-${index}`}>Tech Stack</Label>
                  <Input
                    id={`techStack-${index}`}
                    value={exp.techStack.join(", ")}
                    onChange={(e) => updateExperience(index, "techStack", e.target.value.split(", ").filter(Boolean))}
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
            onClick={addExperience}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
        <div className="flex items-center gap-2 text-lg font-semibold text-navy">
          <Languages className="h-5 w-5" />
          <h3>Languages</h3>
        </div>
        <div className="space-y-6">
          {(resumeData.languages || []).map((lang, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg relative bg-white/30 hover:bg-white/40 transition-colors">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2 group hover:bg-red-300" 
                onClick={() => removeLanguage(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`language-${index}`}>Language</Label>
                  <Input
                    id={`language-${index}`}
                    value={lang.name}
                    onChange={(e) => updateLanguage(index, "name", e.target.value)}
                    className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`proficiency-${index}`}>Proficiency</Label>
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value) => updateLanguage(index, "proficiency", value)}
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
            onClick={addLanguage}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
        <div className="flex items-center gap-2 text-lg font-semibold text-navy">
          <Sparkles className="h-5 w-5" />
          <h3>Skills</h3>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 bg-white/70 hover:bg-white/90 cursor-pointer group"
                onClick={() => removeSkill(skill)}
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
                  addSkill((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
            <Button
              type="button"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                addSkill(input.value);
                input.value = '';
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
