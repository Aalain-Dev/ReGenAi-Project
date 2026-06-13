import React from "react";
import { useAuth } from "../hooks/auth.hooks";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const { user, loading } = useAuth();

  // Wait until getMe() has resolved, otherwise we redirect too early.
  if (loading) return <p>Checking Auth...</p>;

  // Not logged in → send to the login page.
  if (!user) return <Navigate to="/" replace />;

  // Logged in → render the nested protected page.
  return <Outlet />;
};

export default Protected;
