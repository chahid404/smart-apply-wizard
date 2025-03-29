import { useApi } from "@/api/apiClient";
import { ApiResumeExtraInfoData } from "@/types/api/response/ResumeExtraInformationResponse";
import { ApiResume } from "@/types/api/response/resumeResponse";
import HttpMethod from "@/types/http";
import { mapApiResponseToResumeData, mapResumeDataToApiResume } from "@/types/mappers/resumerMapper";
import { ResumeData } from "../types/resume";

const useResumeService = () => {
  const { securedRequest } = useApi();

const createOrUpdateResume = async (data: ResumeData): Promise<ApiResume> => {
    const requestBody = mapResumeDataToApiResume(data);
    return await securedRequest({ url: `/resumes`, method: HttpMethod.POST, data: requestBody });
  };

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
      throw error;
    }
  };

  const createExtraResumeDetails = async (id: string, data: ApiResumeExtraInfoData): Promise<ApiResumeExtraInfoData> => {
    const response = await securedRequest({ url: `/resumes/${id}/extra-details`, method: HttpMethod.POST, data });
    return response;
  };

  const findResumeByUserId = async (userId: string): Promise<ResumeData> => {
    const response = await securedRequest({ url: `/resumes/${userId}/resume`, method: HttpMethod.GET });
    return mapApiResponseToResumeData(response);
  };

  return {
    findById,
    updateResume,
    analyzeResume,
    createExtraResumeDetails,
    findResumeByUserId,
    createOrUpdateResume,
  };
};

export default useResumeService;
