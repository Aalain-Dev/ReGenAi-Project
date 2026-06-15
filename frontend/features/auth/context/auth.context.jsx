import React, { createContext, useState } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { getMe } from "../services/auth.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  // `loading` means ONE thing: the initial "is there a valid session?" check
  // is still running. It starts true so route guards wait for getMe() to
  // resolve before deciding to redirect. It is NOT used for login/logout.
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await getMe();
        setuser(data.user);
      } catch {
        setuser(null);
      } finally {
        setloading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setuser,
        loading,
        setloading,
        error,
        seterror,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
