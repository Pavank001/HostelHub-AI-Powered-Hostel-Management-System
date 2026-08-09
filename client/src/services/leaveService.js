import API from "./api";

// Student - Apply Leave
export const applyLeave = async (data) => {
  const token = localStorage.getItem("token");

  const response = await API.post("/leaves/apply", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Student - Get My Leaves
export const getMyLeaves = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/leaves/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Admin - Get All Leaves
export const getAllLeaves = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/leaves", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Admin - Update Leave Status
export const updateLeaveStatus = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await API.put(`/leaves/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Admin - Delete Leave
export const deleteLeave = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/leaves/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};