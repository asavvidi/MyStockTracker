const prepareStockData = (stock) => {
  const prices = Object.entries(stock).map(([date, price]) => ({
    date,
    open: price["1. open"],
    high: price["2. high"],
    low: price["3. low"],
    close: price["4. close"],
  }));

  const stockPrices = stock.slice(0, 20);
  return stockPrices.map((item) => {
    const high = item.high;
    const low = item.low;
    const open = item.open;
    const close = item.close;

    const floatDifference = close - open;
    const percentageDifference = ((close - open) / open) * 100;

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
