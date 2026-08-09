import axios from "axios";

const API_URL =
  "https://hostelhub-ai-powered-hostel-management.onrender.com/api/ai";

export const askAI = async (message) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/chat`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const submitAIComplaint = async (complaintData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/submit-complaint`,
    complaintData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};