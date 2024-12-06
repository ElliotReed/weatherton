const todayBtn = document.getElementById("today-btn");
todayBtn.addEventListener("click", toggleDisplay);
const hourlyBtn = document.getElementById("hourly-btn");
hourlyBtn.addEventListener("click", toggleDisplay);
const dailyBtn = document.getElementById("daily-btn");
dailyBtn.addEventListener("click", toggleDisplay);

function toggleDisplay(e) {
  const selectedBtn = e.target;
  const sections = document.querySelectorAll(".display-feature");
  const displayBtns = document.querySelectorAll(".display-btn");

  function forEachDisplayBtns() {
    displayBtns.forEach((button) => {
      if (button.name === selectedBtn.name) {
        selectedBtn.classList.add("active");
      } else {
        button.classList.remove(`active`);
      }
    });
  }
  sections.forEach((section) => {
    if (section.id === selectedBtn.name) {
      section.classList.add(`display`);
      forEachDisplayBtns();
    } else {
      section.classList.remove(`display`);
    }
  });
}
