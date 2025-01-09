//Function to prepare and process stock data for display or furthur use
const prepareStockData = (stock) => {
  //Convert stock object into an array of entries with date and stock prices details
  const prices = Object.entries(stock).map(([date, price]) => ({
    date,
    open: price["1. open"],
    high: price["2. high"],
    low: price["3. low"],
    close: price["4. close"],
  }));

  //Slice the array to receive the 20 most recent points
  const stockPrices = prices.slice(0, 20);

  //Format the data so they include the date, prices and the price difference.
  return stockPrices.map((item) => {
    const high = item.high;
    const low = item.low;
    const open = item.open;
    const close = item.close;

    //Calculate the float difference between the close and open price of the stock
    const floatDifference = close - open;

    //Calculate the percentage difference between the close and open price of the stock
    const percentageDifference = ((close - open) / open) * 100;

    //Return the processed and formatted data.
    return {
      date: item.date,
      high: Number(high).toFixed(2) * 1,
      low: Number(low).toFixed(2) * 1,
      close: Number(close).toFixed(2) * 1,
      open: Number(open).toFixed(2) * 1,
      floatDifference: Number(floatDifference).toFixed(2) * 1,
      percentageDifference: Number(percentageDifference).toFixed(2) * 1,
    };
  });
};

export default prepareStockData;
