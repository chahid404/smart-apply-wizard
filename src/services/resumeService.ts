import { useApi } from "@/api/apiClient";
import HttpMethod from "@/types/http";
import { ResumeData } from "../types/resume";

const useResumeService = () => {
  const { securedRequest } = useApi();

  const findById = async (id: string): Promise<ResumeData> => {
    const response = await securedRequest({ url: `/resumes/${id}`, method: HttpMethod.GET });
    return response as ResumeData;
  };

  const updateResume = async (id: string, data: FormData): Promise<ResumeData> => {
    const response = await securedRequest({ url: `/resumes/${id}`, method: HttpMethod.PUT, data });
    return response as ResumeData;
  };

  const analyzeResume = async (data: FormData): Promise<unknown> => {
    const response = await securedRequest({ url: `/resumes/analyze`, method: HttpMethod.POST, data });
    return response;
  };

  const createExtraResumeDetails = async (id: string, data: BodyInit): Promise<unknown> => {
    const response = await securedRequest({ url: `/resumes/${id}/extra-details`, method: HttpMethod.POST, data });
    return response;
  };

  const findResumeByUserId = async (userId: string): Promise<ResumeData> => {
    const response = await securedRequest({ url: `/resumes/${userId}/resume`, method: HttpMethod.GET });
    return response as ResumeData;
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
