import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState("");
  const [loading, setloading] = useState("");
  return (
    <AuthContext.Provider
      value={{
        user,
        setuser,
        loading,
        setloading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
