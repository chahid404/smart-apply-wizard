// src/api/apiService.js
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/v1",
});

export const useApi = () => {
  const { getToken } = useAuth();

  const securedRequest = async (options) => {
    const token = await getToken();
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

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
