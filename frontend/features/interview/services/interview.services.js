import { apiClient } from "../../apiBase";

export const generatereport = async ({
  resume,
  selfdescription,
  jobdescription,
}) => {
  const formdata = new FormData();
  formdata.append("resume", resume[0]);
  formdata.append("jobDescription", jobdescription);
  formdata.append("selfDescription", selfdescription);
  const response = await apiClient.post("/api/reports/", formdata);
  return response.data;
};
export const singlereport = async ({ id }) => {
  const response = await apiClient.get(`/api/reports/getreports/${id}`);
  return response.data;
};
export const getallreports = async () => {
  const response = await apiClient.get(`/api/reports/getallreports`);
  return response.data;
};

