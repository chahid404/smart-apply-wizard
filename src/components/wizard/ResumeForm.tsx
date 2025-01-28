import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/types/resume";
import { Briefcase, Building2, GraduationCap, Plus, Trash2, User } from "lucide-react";

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

  return (
    <div className="space-y-6 mt-8">
      {/* Personal Information Section */}
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

      {/* Professional Summary Section */}
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

      {/* Education Section */}
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

      {/* Experience Section */}
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

      {/* Skills Section */}
      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
        <div className="flex items-center gap-2 text-lg font-semibold text-navy">
          <Briefcase className="h-5 w-5" />
          <h3>Skills</h3>
        </div>
        <Textarea
          value={resumeData.skills.join(", ")}
          onChange={(e) =>
            onChange({
              ...resumeData,
              skills: e.target.value
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean),
            })
          }
          placeholder="Enter skills separated by commas"
          className="min-h-[100px] bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
        />
      </div>
    </div>
  );
};