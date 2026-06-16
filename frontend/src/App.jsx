import { useState } from "react";

import "./App.css";
import AuthProvider from "../features/auth/context/auth.context";
import { Route, Routes } from "react-router-dom";
import SignIn from "../features/auth/pages/SignIn";
import Signup from "../features/auth/pages/Signup";
import Home from "../features/auth/pages/Home";
import Interview from "../features/interview/pages/Interview";
import Protected from "../features/auth/pages/Protected";
import GuestRoute from "../features/auth/pages/GuestRoute";
import AuthMain from "../features/auth/pages/AuthMain";

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
            <Route path="/home" element={<Home />} />
            <Route path="/interview" element={<Interview />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
