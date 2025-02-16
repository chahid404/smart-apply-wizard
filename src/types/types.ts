/* eslint-disable @typescript-eslint/no-explicit-any */
export enum FieldType {
  STRING = "string",
  EMAIL = "email",
  URL = "url",
  FILE = "file",
  NUMBER = "number",
  ADDRESS = "address",
  OBJECT = "object",
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface FieldValidation {
  field: string;
  required?: boolean;
  type?: FieldType;
  customValidate?: (value: any, formData?: any) => boolean;
  message?: string;
}

export interface StepValidation {
  validations: FieldValidation[];
}
