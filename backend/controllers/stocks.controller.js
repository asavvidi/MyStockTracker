import { api, STOCKS_PARAMS } from "#utils/apiConfig";
import prepareStockData from "#utils/prepareStockData";

//A controller function to receive stock data from the API for a given stock symbol
const getStock = async (req, res) => {
  //Input the stockName from the request body, if it is null then set the defaul symbol "IBM".
  const { stockName = "IBM" } = req?.body;

  //Send a GET request to the stock API with the specified stock symbol
  const stockResponse = await api
    .get("/query", STOCKS_PARAMS(stockName))
    .catch((err) => {
      console.log(`Error occured while fetching stock data `, err);
    });

  //Check if the response status is not 200, if it is not send a 500 status with an error message
  if (stockResponse?.status !== 200) {
    return res.status(500).send({ errMessage: `Error fetching stock data` });
  }

  //From the API response extract the stock data
  const stockData = stockResponse.data["Time Series (Daily)"];

  //If the stock data is not found in the response then send a 404 error with a message
  if (!stockData) {
    return res.status(404).send({ errMessage: "No stock data found" });
  }

  //Format and process the data using the prepareStockData function
  const stockDetails = prepareStockData(stockData);

  // Send a successful response with the formatted stock details and the stock name
  res.send({ stockDetails, stockName });
};

//Export the getStock function to be used in routing
export default getStock;
