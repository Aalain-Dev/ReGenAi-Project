import { apiClient } from "../../apiBase";

export const register = async ({ username, email, password }) => {
  const data = {
    username,
    email,
    password,
  };
  const response = await apiClient.post("/api/auth", data);
  console.log(response);
};
export const login = () => {};
export const logout = () => {};
export const getMe = () => {};

