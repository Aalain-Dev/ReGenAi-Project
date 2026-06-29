import React, { useContext } from "react";
import InterviewContext from "../context/Interview.context";
import {
  generatereport,
  getallreports,
  singlereport,
} from "../services/interview.services";

const InterviewHook = () => {
  const context = useContext(InterviewContext);
  const {
    loading,
    setloading,
    report,
    setreport,
    reports,
    setreports,
    error,
    seterror,
  } = context;
  const GenerateReporthook = async ({
    resume,
    selfdescription,
    jobdescription,
  }) => {
    setloading(true);
    seterror("");
    try {
      const response = await generatereport({
        resume,
        selfdescription,
        jobdescription,
      });
      setreport(response.data);
      return response.data;
    } catch (e) {
      // Surface the server's message (e.g. daily limit reached) and re-throw
      // so the calling modal can show an error toast.
      seterror(e?.response?.data?.message || e.message);
      throw e;
    } finally {
      setloading(false);
    }
  };

  const GetSingleReporthook = async ({ id }) => {
    setloading(true);
    try {
      const response = await singlereport({ id });
      setreport(response.data);
      setloading(false);

      return response.data;
    } catch (e) {
      seterror(e.message);
    }
  };

  const GetallReporthook = async () => {
    setloading(true);
    try {
      const response = await getallreports();
      setloading(false);
      setreports(response.data);
      return response.data;
    } catch (e) {
      seterror(e.message);
    }
  };
  return {
    loading,
    setloading,
    report,
    setreport,
    reports,
    setreports,
    error,
    seterror,
    GenerateReporthook,
    GetSingleReporthook,
    GetallReporthook,
  };
};

export default InterviewHook;
