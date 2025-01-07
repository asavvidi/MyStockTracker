import { BACKEND_PORT, BACKEND_URL } from "#config/app.config";
import axios from "axios";

const api = axios.create({
  baseURL: `${BACKEND_URL}:${BACKEND_PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
