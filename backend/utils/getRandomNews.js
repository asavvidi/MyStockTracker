const getRandomNews = (news, count) => {
  let newsData = [];
  let hasRandomNumber = [];
  while (newsData.length < count) {
    let randomNumber = Math.trunc(Math.random() * news.length);
    if (!hasRandomNumber.includes(randomNumber)) {
      newsData.push(news[randomNumber]);
      hasRandomNumber.push(randomNumber);
    }
  }
  return newsData;
};
export default getRandomNews;
