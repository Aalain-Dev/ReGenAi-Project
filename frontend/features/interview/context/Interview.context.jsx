import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewContextProvider = ({ children }) => {
  const [loading, setloading] = useState(null);
  const [report, setreport] = useState(null);
  const [reports, setreports] = useState(null);
  const [error, seterror] = useState(null);

  return (
    <InterviewContext.Provider
      value={{ loading, setloading, report, setreport, reports, setreports,
        error,seterror
       }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export default InterviewContext;
