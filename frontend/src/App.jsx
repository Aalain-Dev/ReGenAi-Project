import { useState } from "react";

import "./App.css";
import AuthProvider from "../features/auth/context/auth.context";
import { Route, Routes } from "react-router-dom";
import SignIn from "../features/auth/pages/SignIn";
import Signup from "../features/auth/pages/Signup";
import Home from "../features/auth/pages/Home";
import Interview from "../features/interview/pages/Interview";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home" element={<Interview />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
