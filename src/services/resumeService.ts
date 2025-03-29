import { useApi } from "@/api/apiClient";
import { ApiResume } from "@/types/api/response/resumeResponse";
import HttpMethod from "@/types/http";
import { mapApiResponseToResumeData } from "@/types/mappers/resumerMapper";
import { ResumeData } from "../types/resume";

const useResumeService = () => {
  const { securedRequest } = useApi();

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

  const createExtraResumeDetails = async (id: string, data: BodyInit): Promise<unknown> => {
    const response = await securedRequest({ url: `/resumes/${id}/extra-details`, method: HttpMethod.POST, data });
    return response;
  };

  const findResumeByUserId = async (userId: string): Promise<ResumeData> => {
    const response = await securedRequest({ url: `/resumes/${userId}/resume`, method: HttpMethod.GET });
    return mapApiResponseToResumeData(response as ApiResume);
  };

  return {
    findById,
    updateResume,
    analyzeResume,
    createExtraResumeDetails,
    findResumeByUserId,
  };
};

export default useResumeService;
