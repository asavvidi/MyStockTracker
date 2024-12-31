const carousel = document.querySelector(".section2-news-container");
const floatChange = document.querySelector(".stock-change");
const percentageChange = document.querySelector(".stock-change-percentage");
const myFirstChart = document.querySelector(".myFirstChart");

document.addEventListener("DOMContentLoaded", (event) => {
  const floatChangeElements = document.querySelectorAll(".stock-change");
  const percentageChangeElements = document.querySelectorAll(
    ".stock-change-percentage"
  );

  floatChangeElements.forEach((floatChange, index) => {
    if (index === 0) {
      return;
    }

    const item = parseFloat(floatChange.textContent.trim());

    if (item > 0) {
      floatChange.style.background = "green ";
      floatChange.style.color = "white";
    } else {
      floatChange.style.background = "red";
      floatChange.style.color = "white";
    }
  });

  percentageChangeElements.forEach((percentageChange, index) => {
    if (index === 0) {
      return;
    }
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

document.addEventListener("DOMContentLoaded", () => {
  async function fetchStockDetails() {
    try {
      const response = await fetch(`/api/stock`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching stock details:", error);
    }
  }

  async function createChart() {
    const stockDetails = await fetchStockDetails();
    if (!stockDetails) return;

    // Extract data for the chart
    const labels = stockDetails.map((item) => item.date).reverse(); // Dates
    const openPrices = stockDetails.map((item) => item.open).reverse(); // Open Prices
    const closePrices = stockDetails.map((item) => item.close).reverse(); // Close Prices

    // Get the canvas for the chart
    const ctx = document.querySelector(".myFirstChart").getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Open Price",
            data: openPrices,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "Close Price",
            data: closePrices,
            borderColor: "rgba(255, 99, 132, 1)",
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
  createChart();
});
