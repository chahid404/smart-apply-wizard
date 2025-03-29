import { useApi } from "@/api/apiClient";
import HttpMethod from "@/types/http";

const useApplicationService = () => {
  const { securedRequest } = useApi();

  const getApplicationById = async (id: string): Promise<unknown> => {
    const response = await securedRequest({ url: `/applications/${id}`, method: HttpMethod.GET });
    return response;
  };

  const getApplicationsByResumeId = async (resumeId: string): Promise<unknown> => {
    const response = await securedRequest({ url: `/applications/resume/${resumeId}`, method: HttpMethod.GET });
    return response;
  };

  const createApplication = async (data: unknown): Promise<unknown> => {
    const response = await securedRequest({ url: `/applications`, method: HttpMethod.POST, data });
    return response;
  };

  const updateApplication = async (id: string, data: BodyInit | null | undefined): Promise<unknown> => {
    const response = await securedRequest({ url: `/applications/${id}`, method: HttpMethod.PUT, data });
    return response;
  };

  return {
    getApplicationById,
    getApplicationsByResumeId,
    createApplication,
    updateApplication,
  };
};

export default useApplicationService;
