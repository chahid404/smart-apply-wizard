import { FieldType, StepValidation } from "@/types/types";

export const stepValidations: Record<number, StepValidation> = {
  1: {
    validations: [
      {
        field: "jobUrl",
        required: true,
        type: FieldType.URL,
        message: "Please enter a valid job URL.",
      },
    ],
  },
  2: {
    validations: [
      {
        field: "resume",
        required: true,
        type: FieldType.FILE,
        message: "Please upload your resume.",
      },
    ],
  },
  3: {
    validations: [
      {
        field: "savedResumeData.personalInfo.firstName",
        required: true,
        type: FieldType.STRING,
        message: "Please enter your first name.",
      },
      {
        field: "savedResumeData.personalInfo.lastName",
        required: true,
        type: FieldType.STRING,
        message: "Please enter your last name.",
      },
      {
        field: "savedResumeData.personalInfo.email",
        required: true,
        type: FieldType.EMAIL,
        message: "Please enter a valid email address.",
      },
      {
        field: "savedResumeData.personalInfo.phoneCode",
        required: true,
        type: FieldType.STRING,
        message: "Please enter your phone code.",
      },
      {
        field: "savedResumeData.personalInfo.phone",
        type: FieldType.STRING,
        customValidate: (value: string) => /^\d+$/.test(value),
        message: "Please enter a valid phone number.",
      },
      {
        field: "savedResumeData.personalInfo.gender",
        required: true,
        type: FieldType.STRING,
        message: "Please select your gender.",
      },
      {
        field: "savedResumeData.personalInfo.address",
        required: true,
        type: FieldType.ADDRESS,
        message: "Please enter your complete address.",
      },
      {
        field: "savedResumeData.summary",
        type: FieldType.STRING,
        customValidate: (value: string) => value.length > 100,
        message: "Profession summary must be more than 100 characters.",
      },
      {
        field: "savedResumeData.skills",
        customValidate: (value: string[]) => value.length >= 3,
        message: "Please add at least 3 skills.",
      },
    ],
  },
  4: {
    validations: [
      {
        field: "extraInformation.noticePeriod",
        required: true,
        type: FieldType.STRING,
        message: "Please fill in your notice period.",
      },
      {
        field: "extraInformation.salaryExpectations.salaryRangeUsd",
        required: true,
        type: FieldType.STRING,
        message: "Please fill in your salary expectation.",
      },
    ],
  },
};
