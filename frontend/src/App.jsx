import { useState } from "react";

import "./App.css";
import AuthProvider from "../features/auth/context/auth.context";
import { Route, Routes } from "react-router-dom";
import Protected from "../features/auth/pages/Protected";
import GuestRoute from "../features/auth/pages/GuestRoute";
import AuthMain from "../features/auth/pages/AuthMain";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Home from "./components/Dashboard/Home";
import Reports from "./components/Dashboard/Reports";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Guest-only: a logged-in user gets bounced to /home */}
          <Route element={<GuestRoute />}>
            <Route path="/" element={<AuthMain />} />
          </Route>

          {/* Protected: a logged-out user gets bounced to / (login) */}
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
