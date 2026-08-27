import API from "./api";

const getToken = () => localStorage.getItem("token");

// Get all rooms
export const getAllRooms = async () => {
  const response = await API.get("/rooms", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Create room
export const createRoom = async (data) => {
  const response = await API.post("/rooms", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Update room
export const updateRoom = async (id, data) => {
  const response = await API.put(`/rooms/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Delete room
export const deleteRoom = async (id) => {
  const response = await API.delete(
    `/rooms/${id}`,
    authConfig()
  );

  return response.data;
};
// Student - Get My Room
export const getMyRoom = async () => {
  const response = await API.get("/allocation/my-room", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
// Get Available Rooms
export const getAvailableRooms = async () => {
  const response = await API.get("/rooms/available", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Assign Room
export const assignRoom = async (data) => {
  const response = await API.post("/allocation/assign", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};