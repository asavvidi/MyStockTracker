import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const getLocalDateAndTime = () => {
  const localDate = new Date();
  return {
    date: localDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .replace(/ /g, " "),

    time: localDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

async function fetchStockDetails(stockName) {
  //A function to retrieve stock data from Alpha Vantage Api.
  //Fetch news data from ALPHA VANTAGE API
  const stockResponse = await axios.get("https://www.alphavantage.co/query", {
    params: {
      function: "TIME_SERIES_DAILY",
      symbol: `${stockName}`,
      apikey: API_KEY,
    },
  });

  const stock = stockResponse.data;
  const dailyStock = stock["Time Series (Daily)"];

  const stockPrices = Object.entries(dailyStock).map(([date, price]) => ({
    date,
    open: price["1. open"],
    high: price["2. high"],
    low: price["3. low"],
    close: price["4. close"],
  }));
  const myStockPrices = stockPrices.slice(0, 20);

  return myStockPrices.map((item) => {
    const high = parseFloat(item.high);
    const low = parseFloat(item.low);

    const open = parseFloat(item.open);
    const close = parseFloat(item.close);

    const floatDifference = close - open;
    const percentageDifference = ((close - open) / open) * 100;

    return {
      date: item.date,
      high: high,
      low: low,
      close: close,
      open: open,
      floatDifference: floatDifference.toFixed(2),
      percentageDifference: percentageDifference.toFixed(2),
    };
  });
}

async function fetchStockNews() {
  //A function to retrieve stock news data from Alpha Vantage Api.
  //Fetch news data from ALPHA VANTAGE API
  const newsResponse = await axios.get("https://www.alphavantage.co/query", {
    params: {
      function: "NEWS_SENTIMENT",
      topics: "financial_markets",
      limit: 20,
      apikey: API_KEY,
    },
  });

  const news = newsResponse.data.feed;
  const myNews = news.map((item) => {
    return {
      title: item.title,
      summary: item.summary,
      url: item.url,
      image: item.banner_image,
    };
  });
  return myNews;
}

const getRandomNews = (news, count) => {
  //A function to retrieve a particular number of random data news.
  let newsData = [];
  let hasRandomNumber = [];
  while (newsData.length < count) {
    let randomNumber = Math.trunc(Math.random() * news.length);
    if (!hasRandomNumber.includes(randomNumber)) {
      hasRandomNumber.push(randomNumber);
      newsData.push(news[randomNumber]);
    }
  }
  return newsData;
};

app.get("/", async (req, res) => {
  try {
    const stockName = "IBM";
    const [stockDetails, stockNews] = await Promise.all([
      fetchStockDetails(stockName),
      fetchStockNews(),
    ]);

    //Fetch only 6 random news from Alpha Vantage API.
    const newsData = getRandomNews(stockNews, 6);

    console.log(stockDetails);
    console.log(newsData);
    const { date, time } = getLocalDateAndTime();

    res.render("index.ejs", {
      currentDate: date,
      currentTime: time,
      news: newsData,
      stockName: stockName,
      stockDetails: stockDetails,
    });
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/stocks/search", async (req, res) => {
  const stockName = req.query.inputStock;
  try {
    const stockName = req.query.inputStock;
    const [stockDetails, stockNews] = await Promise.all([
      fetchStockDetails(stockName),
      fetchStockNews(),
    ]);
    //Fetch only 6 random news from Alpha Vantage API.
    const newsData = getRandomNews(stockNews, 6);
    const { date, time } = getLocalDateAndTime();

    res.render("index.ejs", {
      currentDate: date,
      currentTime: time,
      news: newsData,
      stockName: stockName,
      stockDetails: stockDetails,
    });
  } catch (error) {
    console.log(`Error fetching data from Alpha Vantage:`, error);
    res.status(500).send("Error fetching data");
  }
});

//Expose a endpoint only to serve JSON data ton the client-side
app.get("/api/stock", async (req, res) => {
  try {
    const stockName = req.query.inputStock || "IBM";
    const stockDetails = await fetchStockDetails(stockName);
    res.json(stockDetails);
  } catch (error) {
    console.log(`Error fetching stock data:`, error);
    res.status(500).json({ error: `Failed to fetch stock data` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
