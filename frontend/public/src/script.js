const carousel = document.querySelector(".section2-news-container");
const floatChange = document.querySelector(".stock-change");
const percentageChange = document.querySelector(".stock-change-percentage");
const myFirstChart = document.querySelector(".myFirstChart");

//Set the background color of stock change elements based on stock price difference
document.addEventListener("DOMContentLoaded", () => {
  const floatChangeElements = document.querySelectorAll(".stock-change");
  const percentageChangeElements = document.querySelectorAll(
    ".stock-change-percentage"
  );

  floatChangeElements.forEach((floatChange, index) => {
    //We ignore the first element because it is the title for the container
    if (index === 0) {
      return;
    }
    // Convert the text content of the element to a float
    const item = parseFloat(floatChange.textContent.trim());

    //if the value is positive, set the background color to green and the text color to white.
    if (item > 0) {
      floatChange.style.background = "green ";
      floatChange.style.color = "white";
    }
    //if the value is negative, set the background color to red and the text color to white.
    else {
      floatChange.style.background = "red";
      floatChange.style.color = "white";
    }
  });

  percentageChangeElements.forEach((percentageChange, index) => {
    //We ignore the first element because it is the title for the container
    if (index === 0) {
      return;
    }

    // Convert the text content of the element to a float
    const item = parseFloat(percentageChange.textContent.trim());

    if (item > 0) {
      percentageChange.style.backgroundColor = "green";
      percentageChange.style.color = "white";
    } else {
      percentageChange.style.backgroundColor = "red";
      percentageChange.style.color = "white";
    }
  });
});

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

//Function to create stock chart with chart.js library
function createChart(stockDetails) {
  if (!stockDetails) return;

  // Extract data for the chart from the stockDetails array
  const labels = stockDetails.map((item) => item.date).reverse();
  const openPrices = stockDetails.map((item) => item.open).reverse();
  const closePrices = stockDetails.map((item) => item.close).reverse();

  const ctx = document.querySelector(".myFirstChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Open Price",
          data: openPrices,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Close Price",
          data: closePrices,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: false,

      scales: {
        x: { title: { display: true, text: "Date" } },
        y: { title: { display: true, text: "Price (USD)" } },
      },
    },
  });
}
