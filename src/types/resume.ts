export interface ResumeData {
  personalInfo: {
    fullName: string;
    firstName: string;
    lastName: string;
    role: string;
    address: string;
    email: string;
    phone: string;
    linkedIn: string;
    website?: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages?: Language[];
  certifications?: Certification[];
  projects?: Project[];
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  techStack?: string[];
  description: string[];
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

interface Language {
  name: string;
  proficiency: "Basic" | "Intermediate" | "Advanced" | "Fluent" | "Native";
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface AdditionalCandidateInfo {
  visaStatus: {
    europe: boolean;
    usa: boolean;
    other?: string;
  };
  noticePeriod: string;
  salaryExpectation: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  workPreference: "remote" | "hybrid" | "onsite";
  availableToTravel: boolean;
  willingToRelocate: boolean;
  preferredLocations?: string[];
  languages: string[];
  currentEmploymentStatus: "employed" | "unemployed" | "freelancer" | "student";
}