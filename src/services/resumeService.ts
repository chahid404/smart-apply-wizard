
import { useApi } from "@/api/apiClient";
import HttpMethod from "@/types/http";
import { ResumeData } from "../types/resume";
import { toast } from "sonner";

// Define interfaces for API response
interface ApiResume {
  id: string;
  firstName: string;
  lastName: string;
  role?: string;
  email?: string;
  phone?: string;
  phoneCode?: string | null;
  linkedIn?: string;
  github?: string | null;
  portfolio?: string | null;
  website?: string | null;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  gender?: "male" | "female" | null;
  summary?: string;
  skills: string[];
  userId?: string | null;
  experiences: ApiExperience[];
  educations: ApiEducation[];
  languages: ApiLanguage[];
  certifications: ApiCertification[];
  projects: ApiProject[];
}

interface ApiExperience {
  id: number | null;
  company: string;
  position?: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  description: string[];
  resumeId?: string | null;
}

interface ApiEducation {
  id: number | null;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  resumeId?: string | null;
}

interface ApiLanguage {
  id: number | null;
  name: string;
  proficiency: "Basic" | "Intermediate" | "Advanced" | "Fluent" | "Native";
  resumeId?: string | null;
}

interface ApiCertification {
  id: number | null;
  name: string;
  issuer: string;
  date: string;
  resumeId?: string | null;
}

interface ApiProject {
  id: number | null;
  name: string;
  description: string;
  technologies: string[];
  url?: string | null;
  resumeId?: string | null;
}

// Function to map API response to ResumeData
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
    experience: apiResponse.experiences.map(exp => ({
      company: exp.company,
      position: exp.position || "",
      startDate: exp.startDate,
      endDate: exp.endDate,
      techStack: exp.techStack,
      description: exp.description,
    })),
    education: apiResponse.educations.map(edu => ({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      graduationDate: edu.graduationDate,
    })),
    skills: apiResponse.skills,
    languages: apiResponse.languages.map(lang => ({
      name: lang.name,
      proficiency: lang.proficiency,
    })),
    certifications: apiResponse.certifications.map(cert => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
    })),
    projects: apiResponse.projects.map(proj => ({
      name: proj.name,
      description: proj.description,
      technologies: proj.technologies,
      url: proj.url || undefined,
    })),
  };
};

const useResumeService = () => {
  const { securedRequest } = useApi();

  const findById = async (id: string): Promise<ResumeData> => {
    const response = await securedRequest({ url: `/resumes/${id}`, method: HttpMethod.GET });
    return mapApiResponseToResumeData(response as ApiResume);
  };

  const updateResume = async (id: string, data: FormData): Promise<ResumeData> => {
    const response = await securedRequest({ url: `/resumes/${id}`, method: HttpMethod.PUT, data });
    return mapApiResponseToResumeData(response as ApiResume);
  };

  const analyzeResume = async (data: FormData): Promise<ResumeData> => {
    try {
      const response = await securedRequest({ url: `/resumes/analyze`, method: HttpMethod.POST, data });
      return mapApiResponseToResumeData(response as ApiResume);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error("Failed to analyze resume. Please try again.");
      throw error;
    }
  };

  const createExtraResumeDetails = async (id: string, data: BodyInit): Promise<unknown> => {
    const response = await securedRequest({ url: `/resumes/${id}/extra-details`, method: HttpMethod.POST, data });
    return response;
  };

  const findResumeByUserId = async (userId: string): Promise<ResumeData> => {
    const response = await securedRequest({ url: `/resumes/${userId}/resume`, method: HttpMethod.GET });
    return mapApiResponseToResumeData(response as ApiResume);
  };

  return {
    findById,
    updateResume,
    analyzeResume,
    createExtraResumeDetails,
    findResumeByUserId,
  };
};

export default useResumeService;
