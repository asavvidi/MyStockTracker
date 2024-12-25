const prev = document.querySelector(".previous-button");
const next = document.querySelector(".next-button");
const carousel = document.querySelector(".section2-news-container");
const floatChange = document.querySelector(".stock-change");
const percentageChange = document.querySelector(".stock-change-percentage");

let currentIndex = 0;
const newsItems = carousel.children;
const totalItems = newsItems.length;

const itemWidth = newsItems[0].offsetWidth + 32;

const updateCarousel = () => {
  //The offset is neagtive because the transform=translateX() property shifts the elements along the horizontal axis, and negative values move elements to the left
  //currentIndex is the current index of the the active element news in the carousel.
  //itemWidth is the total width of each news element
  const offset = -(currentIndex * itemWidth);
  carousel.style.transform = `translateX(${offset}px)`;
};

prev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
  console.log("geiaa");
});

next.addEventListener("click", () => {
  if (currentIndex < totalItems - 1) {
    currentIndex++;
    updateCarousel();
  }
});

const floatChangeElements = document.querySelectorAll(".stock-change");

floatChangeElements.forEach((item) => {
  const item = parseFloat(floatChange.textContent);

  if (item > 0) {
    floatChange.style.background = "green";
  }
});
