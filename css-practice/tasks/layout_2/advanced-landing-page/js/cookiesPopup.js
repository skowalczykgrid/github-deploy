const cookiesPopup = document.querySelector(".cookies-popup");

if (!document.cookie.includes("cookies-displayed=true")) {
  cookiesPopup.classList.remove("cookies-hidden");
} else {
  cookiesPopup.classList.add("cookies-hidden");
}

cookiesPopup.lastElementChild.addEventListener("click", () => {
  cookiesPopup.classList.add("cookies-hidden");

  document.cookie = "cookies-displayed=true; max-age=3600";
});
