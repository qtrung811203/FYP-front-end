import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "An unknown error occurred";
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = error.response.data.message || "Unauthorized";
      } else if (error.response.status === 404) {
        errorMessage = "Resource not found";
      } else if (error.response.status === 500) {
        errorMessage = error.response.data.message || "Internal server error";
      } else {
        errorMessage = error.response.data.message || "Something went wrong";
      }
    } else if (error.request) {
      errorMessage = "No response received";
    }
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
