import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { login, logout, register, getMe } from "../services/auth.service";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, error, seterror } = context;

  // NOTE: these handlers never touch `loading`. `loading` is only the
  // app-startup session check. The forms show their own in-flight spinner
  // via react-hook-form's `isSubmitting`. On failure we set `error` and
  // re-throw so the calling page can show a toast.

  const handleRegister = async ({ username, email, password }) => {
    seterror("");
    try {
      await register({ username, email, password }); // server sets the cookie
      const data = await getMe(); // hydrate the real user from that cookie
      setuser(data.user);
      return data.user;
    } catch (e) {
      seterror(e?.response?.data?.message || "Registration failed");
      setuser(null);
      throw e;
    }
  };

  const handlelogin = async ({ email, password }) => {
    seterror("");
    try {
      await login({ email, password }); // server sets the cookie
      const data = await getMe(); // hydrate the real user from that cookie
      setuser(data.user);
      return data.user;
    } catch (e) {
      seterror(e?.response?.data?.message || "Invalid email or password");
      setuser(null);
      throw e;
    }
  };

  const handlelogout = async () => {
    seterror("");
    try {
      await logout();
    } catch (e) {
      seterror(e?.response?.data?.message || "Logout failed");
    } finally {
      // Always clear local state, even if the server call failed.
      setuser(null);
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
