//A function that receives a list of news and a specific number and returns a specified number of random news from the list.
const getRandomNews = (news, count) => {
  let newsData = [];
  let hasRandomNumber = [];
  /*Until the length of the new newsArray reaches the desired specified number, 
  generate a random index within the range of the news array length and add
  the news article of the random index to the result array 
  */
  while (newsData.length < count) {
    let randomNumber = Math.trunc(Math.random() * news.length);
    //Check if the random index is already been used
    if (!hasRandomNumber.includes(randomNumber)) {
      newsData.push(news[randomNumber]);
      hasRandomNumber.push(randomNumber);
    }
  }
  return newsData;
};

export default getRandomNews;
