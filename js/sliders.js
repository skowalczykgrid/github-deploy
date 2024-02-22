const body = document.querySelector("body");

const sliderHero = document.querySelector(".slider");

const sliderHouse = document.querySelector(".house-slider");
const sliderHouseArrowIconsContainer = document.querySelector(".house-slider__buttons");
const sliderHouseArrowIcons = sliderHouseArrowIconsContainer.querySelectorAll("svg");

const sliderReview = document.querySelector(".review-slider");
const sliderReviewArray = Array.from(sliderReview.querySelectorAll(".review-card"));
const sliderDots = document.querySelector(".review-slider-dots");
let sliderDotsArray = Array.from(sliderDots.querySelectorAll(".review-slider-dot"));

let isDragging = false;
let initialTouchPos;
let movementX;

let activeDotIndex;

let currentWindowWidth = window.innerWidth;
let currentBodyWidth = body.getBoundingClientRect().width;

window.addEventListener("resize", () => {
  currentBodyWidth = body.getBoundingClientRect().width;
  currentWindowWidth = currentBodyWidth;
});

const draggingSliderHero = (e) => {
  if (e.type === "touchmove") {
    sliderHero.classList.remove("slider--no-snap");
    return;
  }
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
  if (e.type === "touchmove") {
    sliderHouse.classList.remove("house-slider--no-snap");
    return;
  }
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

const draggingSliderReview = (e) => {
  sliderReview.removeEventListener("scrollend", touchStopReviewSlider);
  if (e.type === "touchmove") {
    sliderReview.classList.remove("review-slider--no-snap");
    sliderReview.addEventListener("scrollend", touchStopReviewSlider);
    return;
  }
  sliderReview.removeEventListener("scrollend", touchStopReviewSlider);

  if (!isDragging) return;
  e.preventDefault();

  sliderReview.classList.add("review-slider--dragging");
  if (e.type === "mousemove") {
    sliderReview.classList.add("review-slider--no-snap");
  }

  const currentTouchPos = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  movementX = initialTouchPos - currentTouchPos;

  sliderReview.scrollLeft += movementX;
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
    if (currentWindowWidth > 1250) {
      return card.offsetLeft - 124;
    } else if (currentWindowWidth > 1024) {
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

const dragStopReview = (e) => {
  isDragging = false;
  sliderReview.classList.remove("review-slider--dragging");

  const snapPoints = sliderReviewArray.map((card, index) => {
    if (index === 0) return -70;
    return card.offsetLeft - 32 - (currentBodyWidth - 64 - card.offsetWidth) / 2;
  });

  const currentScrollLeft = sliderReview.scrollLeft;
  const targetScrollLeft = snapPoints.reduce((previousSnapPoint, currentSnapPoint, index) => {
    return Math.abs(currentSnapPoint - currentScrollLeft) < Math.abs(previousSnapPoint - currentScrollLeft)
      ? currentSnapPoint
      : previousSnapPoint;
  });

  sliderReview.scrollTo({
    left: targetScrollLeft,
    behavior: "smooth",
  });

  sliderDotsArray.forEach((dot) => dot.classList.remove("review-slider-dot--active"));
  activeDotIndex = snapPoints.indexOf(targetScrollLeft);
  sliderDotsArray[activeDotIndex].classList.add("review-slider-dot--active");
};

function sliderReviewDotsListener(e) {
  sliderReviewArray.forEach((_, index) => {
    let dot = document.createElement("div");
    dot.classList.add("review-slider-dot");

    sliderDots.appendChild(dot);
    sliderDotsArray = Array.from(sliderDots.querySelectorAll(".review-slider-dot"));

    dot.addEventListener("click", () => {
      sliderReview.classList.remove("review-slider--no-snap");

      sliderDotsArray.forEach((dot) => dot.classList.remove("review-slider-dot--active"));
      sliderReviewArray[index].scrollIntoView({ behavior: "smooth", inline: "center" });
      dot.classList.add("review-slider-dot--active");
    });
  });
}

function initialReviewSliderState() {
  sliderDotsArray[1].classList.add("review-slider-dot--active");
  sliderReviewArray[1].scrollIntoView({ inline: "center" });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function touchStopReviewSlider(e) {
  let visibleCard;
  let visibleIndex;

  sliderReviewArray.forEach((card, index) => {
    if (isInViewport(card)) {
      visibleCard = card;
      visibleIndex = index;
    }
  });

  sliderDotsArray.forEach((dot) => dot.classList.remove("review-slider-dot--active"));
  activeDotIndex = sliderDotsArray[visibleIndex].classList.add("review-slider-dot--active");
}

const dragStopHero = (e) => {
  isDragging = false;
  sliderHero.classList.remove("slider--dragging");

  const snapPoints = Array.from(sliderHero.querySelectorAll(".hero-box")).map((box) => {
    if (currentWindowWidth > 1250) {
      return box.offsetLeft - 124;
    } else if (currentWindowWidth > 1024) {
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

sliderReviewDotsListener();
initialReviewSliderState();

sliderHero.addEventListener("mousedown", dragStart);
sliderHouse.addEventListener("mousedown", dragStart);
sliderReview.addEventListener("mousedown", dragStart);

sliderHero.addEventListener("touchmove", draggingSliderHero);
sliderHero.addEventListener("mousemove", draggingSliderHero);

sliderHouse.addEventListener("touchmove", draggingSliderHouse);
sliderHouse.addEventListener("mousemove", draggingSliderHouse);

sliderReview.addEventListener("touchmove", draggingSliderReview);
sliderReview.addEventListener("mousemove", draggingSliderReview);

document.addEventListener("mouseup", dragStopHero);
document.addEventListener("mouseup", dragStopHouse);
document.addEventListener("mouseup", dragStopReview);

// SliderHouse arrows

sliderHouseArrowIcons.forEach((icon, idx) => {
  ["click", "keypress"].forEach((event) => {
    icon.addEventListener(event, (e) => {
      if (event === "keypress" && e.key != "Enter") return;
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
});
