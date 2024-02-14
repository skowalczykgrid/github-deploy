const cookiesPopup = document.querySelector(".cookies-popup");
const cookiesPopupDisplayed = document.cookie
  .split("; ")
  .find((cookie) => cookie.startsWith("cookies-displayed="))
  ?.split("=")[1];

if (!cookiesPopupDisplayed) {
  cookiesPopup.style.opacity = "1";
  cookiesPopup.style.visibility = "visible";
}

cookiesPopup.lastElementChild.addEventListener("click", () => {
  cookiesPopup.style.opacity = "0";
  cookiesPopup.style.visibility = "hidden";
  document.cookie = "cookies-displayed=true; max-age=3600";
});
