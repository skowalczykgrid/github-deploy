// House, Villa, Apartement choose
const buttons = document.querySelector(".section-recommendations__type-buttons");
buttons.addEventListener("click", (e) => {
  const activeClass = "btn-transparent-primary--active";

  if (e.target.localName === "button") {
    Array.from(buttons.children).forEach((element) => element.classList.remove(activeClass));
    e.target.classList.add(activeClass);
  }
});
