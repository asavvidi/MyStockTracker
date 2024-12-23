import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const localDate = new Date();
  const formattedDate = localDate
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/ /g, " ");
  const time = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  try {
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "NEWS_SENTIMENT",
        topics: "financial_markets",
        limit: 20,
        apikey: API_KEY,
      },
    });

    const news = response.data.feed;

    const myNews = news.map((item) => {
      return {
        title: item.title,
        summary: item.summary,
        url: item.url,
        image: item.banner_image,
      };
    });
    res.render("index.ejs", {
      currentDate: formattedDate,
      currentTime: time,
      news: myNews,
    });
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
