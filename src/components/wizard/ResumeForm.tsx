import { ResumeData } from "@/types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

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

  return (
    <div className="space-y-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={resumeData.personalInfo.fullName} onChange={(e) => updatePersonalInfo("fullName", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={resumeData.personalInfo.email} onChange={(e) => updatePersonalInfo("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={resumeData.personalInfo.phone} onChange={(e) => updatePersonalInfo("phone", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={resumeData.personalInfo.address} onChange={(e) => updatePersonalInfo("address", e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input id="linkedin" value={resumeData.personalInfo.linkedIn} onChange={(e) => updatePersonalInfo("linkedIn", e.target.value)} />
          </div>
          {/* TODO : add more fields like github, portfolio, etc. */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea value={resumeData.summary} onChange={(e) => onChange({ ...resumeData, summary: e.target.value })} className="min-h-[100px]" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input
                    id={`degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`field-${index}`}>Field of Study</Label>
                  <Input
                    id={`field-${index}`}
                    value={edu.field}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`graduation-${index}`}>Graduation Date</Label>
                  <Input
                    id={`graduation-${index}`}
                    type="month"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(index, "graduationDate", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addEducation}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
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
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};