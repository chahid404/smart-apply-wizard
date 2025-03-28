import { useApi } from "@/api/apiClient";
import HttpMethod from "@/types/http";

const useUserService = () => {
  const { securedRequest } = useApi();

  // Define user service methods here
  // Example:
  const getUserById = async (id: string): Promise<unknown> => {
    const response = await securedRequest({ url: `/users/${id}`, method: HttpMethod.GET });
    return response;
  };

  return {
    getUserById,
  };
};

export default useUserService;
