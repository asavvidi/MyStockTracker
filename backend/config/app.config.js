import {} from "dotenv/config";

const PORT = process.env.PORT ?? 8080;
const API_URL = process.env.API_URL;
const API_NEWS = process.env.API_NEWS;
const API_STOCK = process.env.API_STOCK;

export { PORT, API_URL, API_NEWS, API_STOCK };
