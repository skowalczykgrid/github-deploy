const miniature = document.querySelector(".video-miniature");
const youtubeVideo = document.querySelector(".youtube-video");
const playIcon = document.querySelector(".play-icon");
const images = document.querySelector(".section-ready-to-sell-video__images");
const wrapper = document.querySelector(".section-ready-to-sell-video__wrapper");
const closeButton = document.querySelector(".video-close");
const toHideElements = document.querySelector(".video-to-hide");

const playVideo = (e, event) => {
  if (event === "keypress" && e.key != "Enter") return;

  toHideElements.classList.add("video-hidden");

  closeButton.style.display = "block";
  wrapper.style.cursor = "auto";
  closeButton.style.cursor = "pointer";

  wrapper.classList.add("video-stretch");

  youtubeVideo.style.display = "block";
  youtubeVideo.src += "&autoplay=1";
};

const closeVideo = (e, event) => {
  if (event === "keypress" && e.key != "Enter") return;

  e.stopPropagation();

  toHideElements.classList.remove("video-hidden");
  closeButton.style.display = "none";
  wrapper.style.cursor = "pointer";

  wrapper.classList.remove("video-stretch");

  youtubeVideo.style.display = "none";
  youtubeVideo.src = youtubeVideo.src.replace("&autoplay=1", "&autoplay=0");
};

["click", "keypress"].forEach((event) => {
  wrapper.addEventListener(event, (e) => playVideo(e, event));
  closeButton.addEventListener(event, (e) => closeVideo(e, event));
});
