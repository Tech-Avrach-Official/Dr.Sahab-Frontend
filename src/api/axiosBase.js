import axios from "axios";

const api = axios.create({
  baseURL: "https://dr-sahab-backend.onrender.com",
});

export default api;
