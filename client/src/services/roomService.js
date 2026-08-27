import API from "./api";

const getToken = () => localStorage.getItem("token");

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// =======================================
// Get All Rooms
// =======================================

export const getAllRooms = async () => {
  const response = await API.get(
    "/rooms",
    authConfig()
  );

  return response.data;
};

// =======================================
// Create Room
// =======================================

export const createRoom = async (data) => {
  const response = await API.post(
    "/rooms",
    data,
    authConfig()
  );

  return response.data;
};

// =======================================
// Update Room
// =======================================

export const updateRoom = async (id, data) => {
  const response = await API.put(
    `/rooms/${id}`,
    data,
    authConfig()
  );

  return response.data;
};

// =======================================
// Delete Room
// =======================================

export const deleteRoom = async (id) => {
  const response = await API.delete(
    `/rooms/${id}`,
    authConfig()
  );

  return response.data;
};

// =======================================
// Assign Room
// =======================================

export const assignRoom = async (data) => {
  const response = await API.post(
    "/allocation/assign",
    data,
    authConfig()
  );

  return response.data;
};