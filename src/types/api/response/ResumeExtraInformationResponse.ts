export interface ApiResumeExtraInfoData {
  id?: string;
  resumeId?: string | null;
  userId: string | null;
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
