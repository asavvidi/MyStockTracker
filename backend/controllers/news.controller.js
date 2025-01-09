import { api, NEWS_PARAMS } from "#utils/apiConfig";
import getRandomNews from "#utils/getRandomNews";

//A controller function to receive news data from the API
const getNews = async (req, res) => {
  //Send a GET request to the API using the axios instance and the defines parameters
  const newsResponse = await api.get("/query", NEWS_PARAMS).catch((err) => {
    console.log(`An error occured while fetching news data `, err);
  });

  //Check if the response status is not 200, if it is not send a 500 status and a error message
  if (!newsResponse?.status == 200) {
    return res.status(500).send({
      errMessage: "A general error occured while fetching news data.",
    });
  }

  //Receive the news data from the API response
  const newsArray = newsResponse.data.feed;

  //If the news array length is null then send a 404 status and a error message
  if (!newsArray?.length) {
    return res.status(404).send({ "Error message": `No news data found` });
  }

  //From the news array data, receive 6 random news objects.
  const news = getRandomNews(newsArray, 6);
  console.log(news);
  // Send a successful response with the randomly picked news.
  res.send(news);
};

//Export the getNews function for routing
export default getNews;
