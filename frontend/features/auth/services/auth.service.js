import { apiClient } from "../../apiBase";

export const register = async ({ username, email, password }) => {
  const data = {
    username,
    email,
    password,
  };
  const response = await apiClient.post("/api/auth/register", data);
  return response;  
};
export const login = async ({ email, password }) => {
  const data = {
    email,
    password,
  };
  const response = await apiClient.post("/api/auth/login", data);
  return response.data;
};
export const logout = async () => {
  const response = await apiClient.post("/api/auth/logout");
  return response.data;
};
export const getMe = async () => {
  const response = await apiClient.get("/api/auth/get-me");
  return response.data;
};
