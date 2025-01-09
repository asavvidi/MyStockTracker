import { API_NEWS, API_STOCK, API_URL } from "#config/app.config";
import axios from "axios";

//Create an axios instance with a base API URL for all API requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Define parameters for the news API request
const NEWS_PARAMS = {
  params: {
    function: "NEWS_SENTIMENT",
    topics: "financial_markets",
    limit: 20,
    apikey: API_NEWS,
  },
};

//Define a function for parameters for stock API requests
const STOCKS_PARAMS = (stockName) => {
  return {
    params: {
      function: "TIME_SERIES_DAILY",
      symbol: `${stockName}`,
      apikey: API_STOCK,
    },
  };
};

//export the defines axios instance and parameter definitions
export { api, NEWS_PARAMS, STOCKS_PARAMS };
