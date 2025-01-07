import { api, NEWS_PARAMS } from "#utils/apiConfig";
import getRandomNews from "#utils/getRandomNews";

const getNews = async (req, res) => {
  const newsResponse = await api.get("/query", NEWS_PARAMS).catch((err) => {
    console.log(`An error occured while fetching news data `, err);
  });

  if (!newsResponse?.status == 200) {
    return res.status(500).send({
      errMessage: "A general error occured while fetching news data.",
    });
  }
  const newsArray = newsResponse.data.feed;
  if (!newsArray?.length) {
    return res.status(404).send({ "Error message": `No news data found` });
  }
  const news = getRandomNews(newsArray, 6);
  console.log(news);
  res.send(news);
};

export default getNews;
