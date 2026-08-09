import API from "./api";

const getToken = () => localStorage.getItem("token");

// ===========================
// Student Profile
// ===========================

export const getProfile = async () => {
  const response = await API.get("/students/profile", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateProfile = async (data) => {
  const response = await API.put("/students/profile", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ===========================
// Admin Student Management
// ===========================

// Get All Students
export const getAllStudents = async () => {
  const response = await API.get("/students", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Delete Student
export const deleteStudent = async (id) => {
  const response = await API.delete(`/students/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Update Student
export const updateStudent = async (id, data) => {
  const response = await API.put(`/students/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};