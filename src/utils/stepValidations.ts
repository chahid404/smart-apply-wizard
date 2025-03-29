import { Education, Experience, Language } from "@/types/resume";
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
      {
        field: "resumeData.personalInfo",
        required: true,
        type: FieldType.OBJECT,
        message: "Please wait while we process your resume.",
      },
    ],
  },
  3: {
    validations: [
      {
        field: "resumeData.personalInfo.firstName",
        required: true,
        type: FieldType.STRING,
        message: "Please enter your first name.",
      },
      {
        field: "resumeData.personalInfo.lastName",
        required: true,
        type: FieldType.STRING,
        message: "Please enter your last name.",
      },
      {
        field: "resumeData.personalInfo.email",
        required: true,
        type: FieldType.EMAIL,
        message: "Please enter a valid email address.",
      },
      {
        field: "resumeData.personalInfo.phoneCode",
        required: true,
        type: FieldType.STRING,
        message: "Please enter your phone code.",
      },
      {
        field: "resumeData.personalInfo.phone",
        type: FieldType.STRING,
        customValidate: (value: string) => /^\d+$/.test(value),
        message: "Please enter a valid phone number.",
      },
      {
        field: "resumeData.personalInfo.gender",
        required: true,
        type: FieldType.STRING,
        message: "Please select your gender.",
      },
      {
        field: "resumeData.personalInfo.address",
        required: true,
        type: FieldType.ADDRESS,
        message: "Please enter your complete address.",
      },
      {
        field: "resumeData.personalInfo.linkedIn",
        type: FieldType.STRING,
        required: true,
        message: "Please enter your LinkedIn profile URL.",
      },
      {
        field: "resumeData.personalInfo.linkedIn",
        type: FieldType.STRING,
        customValidate: (value: string) => /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/.test(value),
        message: "Please enter a valid LinkedIn URL.",
      },
      {
        field: "resumeData.summary",
        type: FieldType.STRING,
        customValidate: (value: string) => value?.length > 100,
        message: "Profession summary must be more than 100 characters.",
      },
      {
        field: "resumeData.skills",
        customValidate: (value: string[]) => value?.length >= 3,
        message: "Please add at least 3 skills.",
      },
      {
        field: "resumeData.education",
        customValidate: (value: Education[]) => value?.length > 0,
        message: "Please add at least one education entry.",
      },
      {
        field: "resumeData.education",
        customValidate: (value: Education[]) =>
          value.every((edu) => {
            return (
              edu?.institution?.trim() !== "" &&
              edu?.degree?.trim() !== "" &&
              edu?.field?.trim() !== "" &&
              edu?.graduationDate?.trim() !== ""
            );
          }),
        message: "Please fill in all education fields.",
      },
      {
        field: "resumeData.experience",
        customValidate: (value: Experience[]) => value?.length > 0,
        message: "Please add at least one experience entry.",
      },
      {
        field: "resumeData.experience",
        customValidate: (value: Experience[]) =>
          value.every((exp) => {
            return (
              exp?.company?.trim() !== "" &&
              exp?.position?.trim() !== "" &&
              exp?.startDate?.trim() !== "" &&
              exp?.endDate?.trim() !== "" &&
              exp?.description.every((desc) => desc?.trim() !== "")
            );
          }),
        message: "Please fill in all experience fields.",
      },
      {
        field: "resumeData.languages",
        customValidate: (value: Language[]) => value?.length > 0,
        message: "Please add at least one language.",
      },
      {
        field: "resumeData.languages",
        customValidate: (value: Language[]) =>
          value.every((lang) => {
            return lang?.name?.trim() !== "" && lang?.proficiency !== undefined;
          }),
        message: "Please fill in all language fields.",
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
      {
        field: "extraInformation.salaryExpectations.salaryRangeUsd",
        customValidate: (value: string) => {
          const pattern = /^(\d{1,3}(?:,\d{3})*|\d+)(?:-(\d{1,3}(?:,\d{3})*|\d+))?$/;
          return pattern.test(value.replace(/\s/g, ""));
        },
        message: "Please enter a valid salary range, e.g. 50,000 - 70,000.",
      },
    ],
  },
};
