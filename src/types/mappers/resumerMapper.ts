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
