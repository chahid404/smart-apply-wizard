export interface ResumeData {
  personalInfo: {
    fullName: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone: string;
    phoneCode?: string;
    linkedIn: string;
    github?: string;
    portfolio?: string;
    website?: string;
    address: Address;
    gender?: "male" | "female";
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  certifications?: Certification[];
  projects?: Project[];
}

export interface Address {
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  techStack?: string[];
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export interface Language {
  name: string;
  proficiency: "Basic" | "Intermediate" | "Advanced" | "Fluent" | "Native";
}

export interface Certification {
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

export interface ExtraInformation {
  extraDetails?: string;
  noticePeriod: string;
  salaryExpectations: {
    salaryRangeUsd: string;
  };
  legalAuthorization: LegalAuthorization;
  workPreferences: WorkPreferences;
}

interface LegalAuthorization {
  euWorkAuthorization: boolean;
  usWorkAuthorization: boolean;
  canadaWorkAuthorization: boolean;
  ukWorkAuthorization: boolean;

  requiresUsVisa: boolean;
  requiresUsSponsorship: boolean;
  requiresEuVisa: boolean;
  requiresEuSponsorship: boolean;
  requiresCanadaVisa: boolean;
  requiresCanadaSponsorship: boolean;
  requiresUkVisa: boolean;
  requiresUkSponsorship: boolean;

  legallyAllowedToWorkInEu: boolean;
  legallyAllowedToWorkInUs: boolean;
  legallyAllowedToWorkInCanada: boolean;
  legallyAllowedToWorkInUk: boolean;
}

interface WorkPreferences {
  remoteWork: boolean;
  inPersonWork: boolean;
  openToRelocation: boolean;
  willingToCompleteAssessments: boolean;
  willingToUndergoDrugTests: boolean;
  willingToUndergoBackgroundChecks: boolean;
}
