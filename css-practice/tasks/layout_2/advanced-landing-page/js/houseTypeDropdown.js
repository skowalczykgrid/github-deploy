const typeButtons = document.querySelector(
  ".section-recommendations__type-buttons"
);
const typebuttonsWrapper = document.querySelector(".type-buttons-wrapper");
const typeButtonsArray = Array.from(typeButtons.children);

const arrow = document.createElement("div");
arrow.classList.add("arrow");

const slider = document.querySelector(".house-slider");
const articles = slider.querySelectorAll("article");

let buttonsOpen = false;
let viewportMobile = window.innerWidth <= 450;
let firstButtonIndex = 0;

function hideSomeButtons() {
  viewportMobile = window.innerWidth <= 450;
  arrow.style.display = "none";
  typeButtonsArray.forEach((button, index) => {
    if (viewportMobile) {
      arrow.style.display = "block";
      if (index !== firstButtonIndex) {
        button.classList.add("type-button-hidden");
      } else {
        button.appendChild(arrow);
      }
    } else {
      button.classList.remove("type-button-hidden");
    }
  });
}

hideSomeButtons();
window.addEventListener("resize", hideSomeButtons);

typeButtonsArray.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    const activeClass = "btn-transparent-primary--active";
    arrow.classList.remove("arrow-up");

    if (buttonsOpen) e.stopPropagation();

    typeButtonsArray.forEach((btn) => {
      viewportMobile && btn.classList.add("type-button-hidden");
      btn.classList.remove("type-button-selected");

      btn.querySelector(".arrow")?.remove();
    });

    if (button.dataset.type === "house") {
      articles.forEach((article) => article.classList.remove("hidden"));
      articles.forEach((article) => {
        if (article.dataset.type != "house") {
          article.classList.add("hidden");
        }
      });
    } else if (button.dataset.type === "villa") {
      articles.forEach((article) => article.classList.remove("hidden"));
      articles.forEach((article) => {
        if (article.dataset.type != "villa") {
          article.classList.add("hidden");
        }
      });
    } else if (button.dataset.type === "apartament") {
      articles.forEach((article) => article.classList.remove("hidden"));
      articles.forEach((article) => {
        if (article.dataset.type != "apartament") {
          article.classList.add("hidden");
        }
      });
    }

    if (viewportMobile) {
      typeButtons.classList.add("type-buttons-dropped-down");
      button.classList.remove("type-button-hidden");
      buttonsOpen = !buttonsOpen;
      firstButtonIndex = index;
      button.classList.add("type-button-selected");
      button.classList.add(activeClass);

      button.appendChild(arrow);
    }
  });
});

document.addEventListener("click", (event) => {
  viewportMobile = window.innerWidth <= 450;
  if (!viewportMobile) return;
  if (typeButtons && !typeButtons.contains(event.target)) {
    typeButtons.classList.remove("type-buttons-dropped-down");
    buttonsOpen = !buttonsOpen;

    typeButtonsArray.forEach((btn) => {
      viewportMobile &&
        !btn.classList.contains("type-button-selected") &&
        btn.classList.add("type-button-hidden");
    });
  }
});

typeButtons.addEventListener("click", (e) => {
  const activeClass = "btn-transparent-primary--active";

  let hasActiveClass = e.target.classList.contains(activeClass) === true;

  typeButtonsArray.forEach((button) => {
    button.classList.remove("type-button-hidden");

    if (button.contains(arrow)) {
      arrow.classList.add("arrow-up");
    }

    if (e.target.localName === "button") {
      typeButtonsArray.forEach((element) => {
        element.classList.remove(activeClass);
      });
      if (hasActiveClass) {
        articles.forEach((article) => article.classList.remove("hidden"));
        return;
      }
      e.target.classList.add(activeClass);
    }
  });
});
