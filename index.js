import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import e from "express";

dotenv.config();

const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Get the current date in day week year format
  const localDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/ /g, " ");

  //Get the current time in hour:minute format
  const time = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  try {
    //Fetch news data from ALPHA VANTAGE API
    const newsResponse = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "NEWS_SENTIMENT",
        topics: "financial_markets",
        limit: 20,
        apikey: API_KEY,
      },
    });

    const stockResponse = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol: "IBM",
        apikey: API_KEY,
      },
    });

    const stock = stockResponse.data;

    const dailyStock = stock["Time Series (Daily)"];

    const stockName = stock["Meta Data"]["2. Symbol"];

    const stockPrices = Object.entries(dailyStock).map(([date, price]) => ({
      date,
      open: price["1. open"],
      high: price["2. high"],
      low: price["3. low"],
      close: price["4. close"],
    }));

    const myStockPrices = stockPrices.slice(0, 20);

    const stockDetails = myStockPrices.map((item) => {
      const high = parseFloat(item.high);
      const low = parseFloat(item.low);
      const open = parseFloat(item.open);
      const close = parseFloat(item.close);

      const floatDifference = close - open;
      const percentageDifference = ((close - open) / open) * 100;

      return {
        date: item.date,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        floatDifference: floatDifference.toFixed(2),
        percentageDifference: percentageDifference.toFixed(2),
      };
    });

    console.log(stockDetails);

    // console.log(stockDetails);

    const news = newsResponse.data.feed;

    const myNews = news.map((item) => {
      return {
        title: item.title,
        summary: item.summary,
        url: item.url,
        image: item.banner_image,
      };
    });

    let newsData = [];
    let usedNumber = [];
    while (newsData.length < 6) {
      let randomNumber = Math.trunc(Math.random() * myNews.length);
      if (!usedNumber.includes(randomNumber)) {
        usedNumber.push(randomNumber);
        newsData.push(myNews[randomNumber]);
      }
    }

    res.render("index.ejs", {
      currentDate: localDate,
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
