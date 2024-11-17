import axiosInstance from "../../config/axiosConfig";

// Get all users
export const getUsers = async () => {
  const response = await axiosInstance.get("/users", {
    withCredentials: true,
  });
  return response.data;
};

// Update user role
export const updateUserRole = async (id, data) => {
  const response = await axiosInstance.patch(`/users/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};
