import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { login, logout, register } from "../services/auth.service";
import { set } from "react-hook-form";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, setloading, error, seterror } = context;

  const handleRegister = async ({ username, email, password }) => {
    setloading(true);
    try {
      const response = await register({ username, email, password });
      setuser(response);
      setloading(false);
      return response;
    } catch (e) {
      seterror(e.message);
    } finally {
      setloading(false);
    }
  };
  const handlelogin = async ({ email, password }) => {
    setloading(true);
    try {
      const response = await login({
        email,
        password,
      });
      setuser(response);
      setloading(false);
      return response
    } catch (e) {
      setloading(e.message);
    }
  };

  const handlelogout = async () => {
    setloading(true);
    try {
      const response = await logout();
      setuser(null);
      setloading(false);
    } catch (error) {
      seterror(error.message);
    }
  };

  return {
    user,
    loading,
    error,
    handleRegister,
    handlelogout,
    handlelogin,
  };
};
