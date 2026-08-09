import API from "./api";

const getToken = () => localStorage.getItem("token");

// Get All Notices
export const getAllNotices = async () => {
  const response = await API.get("/notices", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Create Notice
export const createNotice = async (data) => {
  const response = await API.post("/notices", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Update Notice
export const updateNotice = async (id, data) => {
  const response = await API.put(`/notices/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Delete Notice
export const deleteNotice = async (id) => {
  const response = await API.delete(`/notices/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};