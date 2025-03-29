export interface ApiResume {
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

export interface ApiExperience {
  id: number | null;
  company: string;
  position?: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  description: string[];
  resumeId?: string | null;
}

export interface ApiEducation {
  id: number | null;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  resumeId?: string | null;
}

export interface ApiLanguage {
  id: number | null;
  name: string;
  proficiency: "Basic" | "Intermediate" | "Advanced" | "Fluent" | "Native";
  resumeId?: string | null;
}

export interface ApiCertification {
  id: number | null;
  name: string;
  issuer: string;
  date: string;
  resumeId?: string | null;
}

export interface ApiProject {
  id: number | null;
  name: string;
  description: string;
  technologies: string[];
  url?: string | null;
  resumeId?: string | null;
}
