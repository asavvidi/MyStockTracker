import { BACKEND_PORT, BACKEND_URL } from "#config/app.config";
import axios from "axios";

//create an axios instance to configure default settings for all HTTP requests
const api = axios.create({
  //Set the base API URL combining the backend url and port
  baseURL: `${BACKEND_URL}:${BACKEND_PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

//export the axios instance to make requests in the application
export default api;
