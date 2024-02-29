const typeButtons = document.querySelector(".section-recommendations__type-buttons");
const typeButtonsArray = Array.from(typeButtons.children);

const arrow = document.createElement("div");
arrow.classList.add("arrow");

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
      btn.classList.remove(activeClass);
      btn.classList.remove("type-button-selected");

      btn.querySelector(".arrow")?.remove();
    });

    button.classList.add(activeClass);
    if (viewportMobile) {
      button.classList.remove("type-button-hidden");
      buttonsOpen = !buttonsOpen;
      firstButtonIndex = index;
      button.classList.add("type-button-selected");

      button.appendChild(arrow);
    }
  });
});

typeButtons.addEventListener("click", (e) => {
  const activeClass = "btn-transparent-primary--active";

  typeButtonsArray.forEach((button) => {
    button.classList.remove("type-button-hidden");

    if (button.contains(arrow)) {
      arrow.classList.add("arrow-up");
    }

    if (e.target.localName === "button") {
      typeButtonsArray.forEach((element) => element.classList.remove(activeClass));
      e.target.classList.add(activeClass);
    }
  });
});
