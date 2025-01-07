import { api, STOCKS_PARAMS } from "#utils/apiConfig";
import prepareStockData from "#utils/prepareStockData";

const getStock = async (req, res) => {
  const { stockName = "IBM" } = req?.body;
  const stockResponse = await api.get("/query", STOCKS_PARAMS).catch((err) => {
    console.log(`Error occured while fetching stock data `, err);
  });

  if (stockResponse?.status !== 200) {
    return res.status(500).send({ errMessage: `Error fetching stock data` });
  }

  const stockData = stockResponse.data["Time Series (Daily)"];
  if (!stockData?.length) {
    return res.status(404).send({ errMessage: "No stock data found" });
  }

  const stockDetails = prepareStockData(stockData);
  console.log(stockDetails);
  res.send({ stockData, stockName });
};

export default getStock;
