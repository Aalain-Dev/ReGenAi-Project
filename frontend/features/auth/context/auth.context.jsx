import React, { createContext, useState } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { getMe } from "../services/auth.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
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
  console.log(user)
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
