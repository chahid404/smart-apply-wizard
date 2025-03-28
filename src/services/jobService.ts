import { useApi } from "@/api/apiClient";
import HttpMethod from "@/types/http";

const useJobService = () => {
  const { securedRequest } = useApi();

  // Define job service methods here
  // Example:
  const getJobById = async (id: string): Promise<unknown> => {
    const response = await securedRequest({ url: `/jobs/${id}`, method: HttpMethod.GET });
    return response;
  };

  return {
    getJobById,
  };
};

export default useJobService;
