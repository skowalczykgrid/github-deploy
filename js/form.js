const message = document.getElementById("form_message");
const counter = document.getElementById("form_message-counter");

message.addEventListener("input", (e) => {
  const target = e.target;
  const maxLength = target.getAttribute("maxlength");

  const currentLength = target.value.length;
  console.log("asd");
  counter.innerText = `${currentLength} / ${maxLength}`;
});

const emailInput = document.querySelector(".email-bar__input");
const emailError = document.querySelector(".email-bar__error");
const emailBar = document.querySelector(".email-bar");

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

emailInput.addEventListener("input", () => {
  const enteredEmail = emailInput.value.trim();

  if (enteredEmail === "") {
    emailError.textContent = "";
    emailBar.classList.remove("email-bar--error", "email-bar--success");
  } else if (!validateEmail(enteredEmail)) {
    emailError.textContent = "Invalid email address";
    emailBar.classList.add("email-bar--error");
  } else {
    emailError.textContent = "";
    emailBar.classList.remove("email-bar--error");
    emailBar.classList.add("email-bar--success");
  }
});

const dropdown = document.querySelector(".dropdown-form");
const dropdownSelected = document.querySelector(".dropdown-form__property");
const dropdownContent = document.querySelector(".dropdown-form__content");
const dropdownItems = dropdownContent.querySelectorAll("a");

dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    dropdownSelected.textContent = item.textContent;
  });
});
