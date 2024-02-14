const sliderHero = document.querySelector(".slider");

const sliderHouse = document.querySelector(".house-slider");
const sliderHouseArrowIconsContainer = document.querySelector(".house-slider__buttons");
const sliderHouseArrowIcons = sliderHouseArrowIconsContainer.querySelectorAll("svg");
const houseCard = sliderHouse.querySelectorAll(".house-card")[0];

let isDragging = false;
let initialTouchPos;
let movementX;

const draggingSliderHero = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  sliderHero.classList.add("slider--dragging");
  if (e.type === "mousemove") {
    sliderHero.classList.add("slider--no-snap");
  }

  const currentTouchPos = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  movementX = initialTouchPos - currentTouchPos;

  sliderHero.scrollLeft += movementX;
  initialTouchPos = currentTouchPos;
};

const draggingSliderHouse = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  sliderHouse.classList.add("house-slider--dragging");
  if (e.type === "mousemove") {
    sliderHouse.classList.add("house-slider--no-snap");
  }

  const currentTouchPos = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  movementX = initialTouchPos - currentTouchPos;

  sliderHouse.scrollLeft += movementX;
  initialTouchPos = currentTouchPos;
};

const dragStart = (e) => {
  isDragging = true;
  e.preventDefault();
  initialTouchPos = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
};

const dragStopHouse = (e) => {
  isDragging = false;
  sliderHouse.classList.remove("house-slider--dragging");

  const snapPoints = Array.from(sliderHouse.querySelectorAll(".house-card")).map((card) => {
    if (window.innerWidth > 1250) {
      return card.offsetLeft - 124;
    } else if (window.innerWidth > 1024) {
      return card.offsetLeft - 100;
    } else {
      return card.offsetLeft - 20;
    }
  });

  const currentScrollLeft = sliderHouse.scrollLeft;
  const targetScrollLeft = snapPoints.reduce((previousSnapPoint, currentSnapPoint) => {
    return Math.abs(currentSnapPoint - currentScrollLeft) < Math.abs(previousSnapPoint - currentScrollLeft)
      ? currentSnapPoint
      : previousSnapPoint;
  });

  sliderHouse.scrollTo({
    left: targetScrollLeft,
    behavior: "smooth",
  });
};

const dragStopHero = (e) => {
  isDragging = false;
  sliderHero.classList.remove("slider--dragging");

  const snapPoints = Array.from(sliderHero.querySelectorAll(".hero-box")).map((box) => {
    if (window.innerWidth > 1250) {
      return box.offsetLeft - 124;
    } else if (window.innerWidth > 1024) {
      return box.offsetLeft - 100;
    } else {
      return box.offsetLeft - 20;
    }
  });

  const currentScrollLeft = sliderHero.scrollLeft;
  const targetScrollLeft = snapPoints.reduce((previousSnapPoint, currentSnapPoint) => {
    return Math.abs(currentSnapPoint - currentScrollLeft) < Math.abs(previousSnapPoint - currentScrollLeft)
      ? currentSnapPoint
      : previousSnapPoint;
  });

  sliderHero.scrollTo({
    left: targetScrollLeft,
    behavior: "smooth",
  });
};

sliderHero.addEventListener("mousedown", dragStart);
sliderHouse.addEventListener("mousedown", dragStart);

sliderHero.addEventListener("mousemove", draggingSliderHero);
sliderHouse.addEventListener("mousemove", draggingSliderHouse);

document.addEventListener("mouseup", dragStopHero);
document.addEventListener("mouseup", dragStopHouse);

// SliderHouse arrows

sliderHouseArrowIcons.forEach((icon, idx) => {
  icon.addEventListener("click", () => {
    sliderHouseArrowIcons.forEach((icon) => {
      icon.classList.remove("house-slider__active-button");
    });

    sliderHouse.classList.remove("house-slider--no-snap");
    icon.classList.add("house-slider__active-button");

    if (idx === 0) {
      sliderHouse.scrollTo({
        left: sliderHouse.scrollLeft - sliderHouse.firstElementChild.offsetWidth,
        behavior: "smooth",
      });
    } else {
      sliderHouse.scrollTo({
        left: sliderHouse.scrollLeft + sliderHouse.firstElementChild.offsetWidth,
        behavior: "smooth",
      });
    }
  });
});
