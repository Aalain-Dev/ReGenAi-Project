import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("This is Inteceptor")
    console.log("Response: ", response);
    return response;
  },
  (error) => {
    console.log("Error:", error);
    return Promise.reject(error);
  }
);