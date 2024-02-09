import "./sass/main.scss";

// Cookies close
const cookies = document.querySelector(".cookies");
cookies.lastElementChild.addEventListener("click", () => {
  cookies.style.opacity = "0";
  cookies.style.visibility = "hidden";
});

// Slider
const slider = document.querySelector(".slider");

let isDragging = false;
let initialTouchPos;

const dragging = (e) => {
  e.preventDefault();
  if (!isDragging) return;

  const currentTouchPos = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  const movementX = initialTouchPos - currentTouchPos;

  slider.scrollLeft += Math.round(movementX);
  initialTouchPos = currentTouchPos;
};

const dragStart = (e) => {
  isDragging = true;
  e.preventDefault();
  initialTouchPos = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
};

const dragStop = (e) => (isDragging = false);

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

slider.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
document.addEventListener("touchend", dragStop);
