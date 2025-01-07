import { API_NEWS, API_STOCK, API_URL } from "#config/app.config";
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const NEWS_PARAMS = {
  params: {
    function: "NEWS_SENTIMENT",
    topics: "financial_markets",
    limit: 20,
    apikey: API_NEWS,
  },
};

const STOCKS_PARAMS = (stockName) => {
  return {
    params: {
      function: "TIME_SERIES_DAILY",
      symbol: `${stockName}`,
      apikey: API_STOCK,
    },
  };
};

export { api, NEWS_PARAMS, STOCKS_PARAMS };
