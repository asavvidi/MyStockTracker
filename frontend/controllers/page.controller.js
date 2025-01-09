/*
This module handles fetching data from the backend and rendering the frontend.
*/

import api from "#utils/apiConfig";

//function to fetch data from the backend server
const fetchStockData = async (stockName) => {
  //make a post request to the /stocks route with the stockName
  const stockResponse = await api
    .post("/stocks", { stockName })
    .catch((err) => {
      console.log(err);
    });

  //Receive the stockData from the response, if they are not null
  const stockData = stockResponse?.data;
  console.log("Show me the stock data", stockData);
  return stockData;
};

//Function to receive news data from the backend
const fetchNewsData = async () => {
  //make a GET request to the /news route
  const newsResponse = await api.get("/news").catch((err) => {
    console.log(err);
  });

  //Receive the news data from the response, if they are not null
  const newsData = newsResponse?.data;
  // console.log("Is this undefined?", newsData);
  return newsData;
};

//function to handle the fetch with the default stockName and news and render the inital page.
const fetchData = async (req, res) => {
  const stock = await fetchStockData();
  const news = await fetchNewsData();

  //console.log("Here are the news", news);
  //console.log("Here are the stocks", stockDetails);

  // Render the `index.ejs` page with the fetched stock and news data
  res.render("index.ejs", { stock, news });
};

// Function to handle a request to fetch new stock data and render the page
const fetchNewData = async (req, res) => {
  console.log("The new stock name is ", req.body);
  // Extract the stock name from the request body
  const { stockName } = req?.body;
  console.log(`The stockName is... ${stockName}`);

  //Fetch the stock data with the provided stockName and fetch the news
  const stock = await fetchStockData(stockName);
  console.log("The stock name of the stock is", stock.stockName);
  const news = await fetchNewsData();
  // Render the `index.ejs` page with the updated stock and news data
  res.render("index.ejs", { stock, news });
};

const controller = { fetchData, fetchNewData };
export default controller;
