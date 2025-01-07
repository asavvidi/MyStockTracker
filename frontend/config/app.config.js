import {} from "dotenv/config";

const BACKEND_URL = process.env.BACKEND_URL;
const BACKEND_PORT = process.env.BACKEND_PORT;
const SERVER_PORT = process.env.SERVER_PORT;

export { BACKEND_PORT, BACKEND_URL, SERVER_PORT };
