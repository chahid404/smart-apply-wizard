
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
  languages: Language[];
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
