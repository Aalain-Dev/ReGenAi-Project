import React from "react";
import { useAuth } from "../hooks/auth.hooks";
import { Navigate, Outlet } from "react-router-dom";

// Guest-only routes (login / signup).
// If the user is ALREADY logged in, keep them out and send them to /home.
const GuestRoute = () => {
  const { user, loading } = useAuth();

  // Wait until getMe() has resolved before deciding.
  if (loading) return <p>Checking Auth...</p>;

  // Already logged in → don't allow login/signup again.
  if (user) return <Navigate to="/home" replace />;

  // Not logged in → show the login/signup page.
  return <Outlet />;
};

export default GuestRoute;
