import { ApiResume } from "@/types/api/response/resumeResponse";
import { ResumeData } from "@/types/resume";

//TODO make the frontend and backend in the same objects structure : https://app.itsdart.com/d/BtfCYSAnbFx5/gQD06fFrONFc-Make-the-frontend-and-backend
export const mapApiResponseToResumeData = (apiResponse: ApiResume): ResumeData => {
  return {
    personalInfo: {
      fullName: `${apiResponse.firstName} ${apiResponse.lastName}`,
      firstName: apiResponse.firstName,
      lastName: apiResponse.lastName,
      role: apiResponse.role || "",
      email: apiResponse.email || "",
      phone: apiResponse.phone || "",
      phoneCode: apiResponse.phoneCode || "",
      linkedIn: apiResponse.linkedIn || "",
      github: apiResponse.github || "",
      portfolio: apiResponse.portfolio || "",
      website: apiResponse.website || "",
      address: {
        streetAddress: apiResponse.streetAddress || "",
        city: apiResponse.city || "",
        state: apiResponse.state || "",
        zipCode: apiResponse.zipCode || "",
        country: apiResponse.country || "",
      },
      gender: apiResponse.gender || undefined,
    },
    summary: apiResponse.summary || "",
    experience: apiResponse.experiences.map((exp) => ({
      company: exp.company,
      position: exp.position || "",
      startDate: exp.startDate,
      endDate: exp.endDate,
      techStack: exp.techStack,
      description: exp.description,
    })),
    education: apiResponse.educations.map((edu) => ({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      graduationDate: edu.graduationDate,
    })),
    skills: apiResponse.skills,
    languages: apiResponse.languages.map((lang) => ({
      name: lang.name,
      proficiency: lang.proficiency,
    })),
    certifications: apiResponse.certifications.map((cert) => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
    })),
    projects: apiResponse.projects.map((proj) => ({
      name: proj.name,
      description: proj.description,
      technologies: proj.technologies,
      url: proj.url || undefined,
    })),
  };
};

export const mapResumeDataToApiResume = (resumeData: ResumeData): ApiResume => {
  return {
    id: null,
    firstName: resumeData.personalInfo.firstName,
    lastName: resumeData.personalInfo.lastName,
    role: resumeData.personalInfo.role,
    email: resumeData.personalInfo.email,
    phone: resumeData.personalInfo.phone,
    phoneCode: resumeData.personalInfo.phoneCode,
    linkedIn: resumeData.personalInfo.linkedIn,
    github: resumeData.personalInfo.github,
    portfolio: resumeData.personalInfo.portfolio,
    website: resumeData.personalInfo.website,
    streetAddress: resumeData.personalInfo.address.streetAddress,
    city: resumeData.personalInfo.address.city,
    state: resumeData.personalInfo.address.state,
    zipCode: resumeData.personalInfo.address.zipCode,
    country: resumeData.personalInfo.address.country,
    gender: resumeData.personalInfo.gender,
    summary: resumeData.summary,
    experiences: resumeData.experience.map((exp) => ({
      id: null,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      techStack: exp.techStack,
      description: exp.description,
    })),
    educations: resumeData.education.map((edu) => ({
      id: null,
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      graduationDate: edu.graduationDate,
    })),
    skills: resumeData.skills,
    languages: resumeData.languages.map((lang) => ({
      id: null,
      name: lang.name,
      proficiency: lang.proficiency,
    })),
    certifications: resumeData.certifications.map((cert) => ({
      id: null,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
    })),
    projects: resumeData.projects.map((proj) => ({
      id: null,
      name: proj.name,
      description: proj.description,
      technologies: proj.technologies,
      url: proj.url,
    })),
  };
};
