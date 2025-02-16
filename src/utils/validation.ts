/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldType, FieldValidation, ValidationResult } from "@/types/types";

// Helper to get nested value from an object given a dot-separated path
export const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
};

// Field validator that checks required, type, and custom validations
export const validateField = (formData: any, fieldValidation: FieldValidation): ValidationResult => {
  const value = getNestedValue(formData, fieldValidation.field);

  // Required check
  if (fieldValidation.required && (value === null || value === undefined || value === "")) {
    return {
      isValid: false,
      message: fieldValidation.message || `${fieldValidation.field} is required.`,
    };
  }

  // Only continue if value exists (or not required)
  if (value === null || value === undefined || value === "") {
    return { isValid: true };
  }

  // Type-specific validations
  const typeValidations: Record<FieldType, (val: any) => ValidationResult> = {
    [FieldType.STRING]: validateString,
    [FieldType.EMAIL]: validateEmail,
    [FieldType.URL]: validateUrl,
    [FieldType.FILE]: validateFile,
    [FieldType.NUMBER]: validateNumber,
    [FieldType.ADDRESS]: validateAddress,
    [FieldType.OBJECT]: () => ({ isValid: true }),
  };

  if (fieldValidation.type && typeValidations[fieldValidation.type]) {
    const typeValidation = typeValidations[fieldValidation.type](value);
    if (!typeValidation.isValid) {
      return {
        isValid: false,
        message: fieldValidation.message || typeValidation.message,
      };
    }
  }

  // Custom validation if provided
  if (fieldValidation.customValidate && !fieldValidation.customValidate(value, formData)) {
    return {
      isValid: false,
      message: fieldValidation.message || `Invalid value for ${fieldValidation.field}.`,
    };
  }

  return { isValid: true };
};

// Helper validation functions
const validateString = (value: any): ValidationResult => {
  if (typeof value !== "string" || value.trim() === "") {
    return {
      isValid: false,
      message: "Must be a valid string.",
    };
  }
  return { isValid: true };
};

const validateEmail = (value: any): ValidationResult => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof value !== "string" || !emailPattern.test(value)) {
    return {
      isValid: false,
      message: "Please enter a valid email address.",
    };
  }
  return { isValid: true };
};

const validateUrl = (value: any): ValidationResult => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d_.@:%+~#?&/=]*)?" +
      "(\\?[;&a-z\\d_.@:%+~#?&/=]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  if (typeof value !== "string" || !urlPattern.test(value)) {
    return {
      isValid: false,
      message: "Please enter a valid URL.",
    };
  }
  return { isValid: true };
};

const validateFile = (value: any): ValidationResult => {
  if (!(value instanceof File)) {
    return {
      isValid: false,
      message: "Please upload a valid file.",
    };
  }
  return { isValid: true };
};

const validateNumber = (value: any): ValidationResult => {
  if (typeof value !== "number" || isNaN(value) || value < 0) {
    return {
      isValid: false,
      message: "Must be a positive number.",
    };
  }
  return { isValid: true };
};

const validateAddress = (value: any): ValidationResult => {
  if (typeof value !== "object" || !value) {
    return {
      isValid: false,
      message: "Invalid address format.",
    };
  }

  const requiredFields = ["streetAddress", "city", "state", "zipCode", "country"];
  for (const field of requiredFields) {
    if (!value[field] || value[field].trim() === "") {
      return {
        isValid: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
      };
    }
  }

  return { isValid: true };
};

// Step validation helper
export const validateStep = (step: number, formData: any, stepValidations: Record<number, { validations: FieldValidation[] }>): ValidationResult => {
  const stepValidation = stepValidations[step];
  if (!stepValidation) return { isValid: true };

  for (const fieldVal of stepValidation.validations) {
    const result = validateField(formData, fieldVal);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
};
