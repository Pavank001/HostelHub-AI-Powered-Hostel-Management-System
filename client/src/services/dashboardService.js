import API from "./api";

const getToken = () => localStorage.getItem("token");

export const getAdminDashboard = async () => {
  const response = await API.get("/dashboard/admin", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getStudentDashboard = async () => {
  const response = await API.get("/dashboard/student", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};