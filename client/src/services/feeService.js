import API from "./api";

const getToken = () => localStorage.getItem("token");

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// =======================================
// Student - Get My Fees
// =======================================
export const getMyFees = async () => {
  const response = await API.get(
    "/fees/my",
    authConfig()
  );

  return response.data;
};

// =======================================
// Admin - Get All Fees
// =======================================
export const getAllFees = async () => {
  const response = await API.get(
    "/fees",
    authConfig()
  );

  return response.data;
};

// =======================================
// Admin - Create Fee
// =======================================
export const createFee = async (data) => {
  const response = await API.post(
    "/fees",
    data,
    authConfig()
  );

  return response.data;
};

// =======================================
// Admin - Update Fee
// =======================================
export const updateFee = async (id, data) => {
  const response = await API.put(
    `/fees/${id}`,
    data,
    authConfig()
  );

  return response.data;
};

// =======================================
// Admin - Delete Fee
// =======================================
export const deleteFee = async (id) => {
  const response = await API.delete(
    `/fees/${id}`,
    authConfig()
  );

  return response.data;
};