const cookiesPopup = document.querySelector(".cookies-popup");

if (!document.cookie.includes("cookies-displayed=true")) {
  cookiesPopup.style.display = "grid";
} else {
  cookiesPopup.style.display = "none";
}

cookiesPopup.lastElementChild.addEventListener("click", () => {
  cookiesPopup.style.display = "none";
  document.cookie = "cookies-displayed=true; max-age=3600";
});
