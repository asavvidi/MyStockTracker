import api from "#utils/apiConfig";

const fetchStockData = async (stockName) => {
  const stockResponse = await api
    .post("/stocks", { stockName })
    .catch((err) => {
      console.log(err);
    });
  const stockData = stockResponse?.data;
  console.log("Is this undefined? ", stockData);
  return stockData;
};

const fetchNewsData = async () => {
  const newsResponse = await api.get("/news").catch((err) => {
    console.log(err);
  });
  const newsData = newsResponse?.data;
  console.log("Is this undefined?", newsData);
  return newsData;
};

const fetchData = async (req, res) => {
  const stockDetails = await fetchStockData();
  const news = await fetchNewsData();

  res.render("index.ejs", { stockDetails: stockDetails, news: news });
};

const fetchNewData = async (req, res) => {
  const { stockName } = req?.body?.inputStock;
  const stockDetails = await fetchStockData(stockName);
  const news = await fetchNewsData();
  res.render("index.ejs", { stockDetails: stockDetails, news: news });
};

const controller = { fetchData, fetchNewData };
export default controller;
