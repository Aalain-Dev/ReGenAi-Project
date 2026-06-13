import React from "react";
import { useAuth } from "../hooks/auth.hooks";
import { Navigate } from "react-router-dom";

const Protected = () => {
  const { user, loading } = useAuth();
  if (loading) return <p>Checking Auth...</p>;

  if (!user) {
    return <Navigate to="/home" />;
  }
};

export default Protected;
