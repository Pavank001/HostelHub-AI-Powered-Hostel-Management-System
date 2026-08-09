import API from "./api";

const getToken = () => localStorage.getItem("token");

// Student - Create Complaint
export const createComplaint = async (data) => {
  const response = await API.post("/complaints", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Student - My Complaints
export const getMyComplaints = async () => {
  const response = await API.get("/complaints/my", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Admin - All Complaints
export const getAllComplaints = async () => {
  const response = await API.get("/complaints", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Admin - Update Status
export const updateComplaintStatus = async (id, data) => {
  const response = await API.put(`/complaints/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Admin - Delete Complaint
export const deleteComplaint = async (id) => {
  const response = await API.delete(`/complaints/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};