import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState("");
  const [loading, setloading] = useState("");
  const [error, seterror] = useState("");
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
