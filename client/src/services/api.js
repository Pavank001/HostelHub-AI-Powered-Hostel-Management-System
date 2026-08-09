import axios from "axios";

const API = axios.create({
  baseURL: "https://hostelhub-ai-powered-hostel-management.onrender.com/api",
});

export default API;