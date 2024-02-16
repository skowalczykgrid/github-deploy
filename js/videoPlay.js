const miniature = document.querySelector(".video-miniature");
const youtubeVideo = document.querySelector(".youtube-video");
const playIcon = document.querySelector(".play-icon");
const images = document.querySelector(".section-ready-to-sell-video__images");
const wrapper = document.querySelector(".section-ready-to-sell-video__wrapper");

wrapper.addEventListener("click", () => {
  miniature.style.display = "none";
  playIcon.style.display = "none";
  images.style.display = "none";

  wrapper.style.width = "100%";

  youtubeVideo.style.display = "block";
  youtubeVideo.src += "&autoplay=1";
});
