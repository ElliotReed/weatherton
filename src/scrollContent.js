const btnLeft = document.getElementById("scroll-left");
const btnRight = document.getElementById("scroll-right");
const forecastContainer = document.getElementById(
  "forecast-feature__container"
);
let scrollInterval;

btnLeft.addEventListener("mousedown", scroll);
btnRight.addEventListener("mousedown", scroll);
forecastContainer.addEventListener("mouseup", (e) => {
  clearInterval(scrollInterval);
  handleButtonState();
});

function scroll(e) {
  const container = document.querySelector(
    ".display-feature.display > .forecast-container"
  );
  const card = container.querySelector(".card");
  const amountToScroll = card.offsetWidth;

  function move() {
    if (e.target.id === "scroll-left") {
      container.scrollLeft -= amountToScroll;
    } else {
      container.scrollLeft += amountToScroll;
    }
  }
  move();
  scrollInterval = setInterval(move, 600);
}

function handleButtonState() {
  const container = document.querySelector(
    ".display-feature.display > .forecast-container"
  );
  if (container.scrollLeft === 0) {
    btnLeft.classList.add("noscroll");
  } else {
    btnLeft.classList.remove("noscroll");
  }

  if (container.scrollLeft + container.clientWidth === container.scrollWidth) {
    btnRight.classList.add("noscroll");
  } else {
    btnRight.classList.remove("noscroll");
  }
}
