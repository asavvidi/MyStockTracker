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
