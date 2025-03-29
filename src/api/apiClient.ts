import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
});

export const useApi = () => {
  const { getToken } = useAuth();

  const securedRequest = async (options: { url: string; method: string; headers?: Record<string, string>; data?: unknown }) => {
    const token = await getToken();
    const headers: Record<string, string> = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    if (!(options.data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const response = await api({
        ...options,
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  };

  return { securedRequest };
};
