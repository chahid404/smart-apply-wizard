import { ResumeData } from "@/types/resume";
import { EducationSection } from "./resume-sections/EducationSection";
import { ExperienceSection } from "./resume-sections/ExperienceSection";
import { LanguagesSection } from "./resume-sections/LanguagesSection";
import { PersonalInfoSection } from "./resume-sections/PersonalInfoSection";
import { ProfessionalSummarySection } from "./resume-sections/ProfessionalSummarySection";
import { SkillsSection } from "./resume-sections/SkillsSection";

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
      <PersonalInfoSection personalInfo={resumeData.personalInfo} onUpdate={updatePersonalInfo} />

      <ProfessionalSummarySection summary={resumeData.summary} onUpdate={(summary) => onChange({ ...resumeData, summary })} />

      <EducationSection education={resumeData.education} onAdd={addEducation} onUpdate={updateEducation} onRemove={removeEducation} />

      <ExperienceSection experience={resumeData.experience} onAdd={addExperience} onUpdate={updateExperience} onRemove={removeExperience} />

      <LanguagesSection languages={resumeData.languages || []} onAdd={addLanguage} onUpdate={updateLanguage} onRemove={removeLanguage} />

      <SkillsSection skills={resumeData.skills} onAdd={addSkill} onRemove={removeSkill} />
    </div>
  );
};
