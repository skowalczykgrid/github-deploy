let articles = document.querySelectorAll(".article");
let smallArticleContainer = document.querySelector(".articles__small");
let bigArticleContainer = document.querySelector(".articles__big");
let smallArticles = smallArticleContainer.querySelectorAll(".article");

const button = document.querySelector(".btn-more-articles");
let allExceptThreeSmallArticles = smallArticleContainer.querySelectorAll(".article:not(:nth-child(-n + 3))");

let viewPortWidth = window.innerWidth;
window.addEventListener("resize", () => (viewPortWidth = window.innerWidth));

function articleChange() {
  articles.forEach((article) => {
    let articleClone = article.cloneNode(true);
    article.addEventListener("click", () => {
      if (article.classList.contains("article--big") || viewPortWidth <= 600) return;

      articles.forEach((art) => art.classList.remove("article--big"));
      articleClone.classList.add("article--big");

      bigArticleContainer.innerHTML = "";
      bigArticleContainer.appendChild(articleClone);
      articleClone.classList.remove("article--hidden");
    });
  });
}

function moreArticles() {
  smallArticles = smallArticleContainer.querySelectorAll(".article");
  smallArticles.forEach((article) => article.classList.remove("article--hidden"));
  articles = document.querySelectorAll(".article");
  articles.forEach((article) => article.classList.remove("article--hidden"));
  button.textContent = "Less Articles";

  button.removeEventListener("click", moreArticles);
  button.addEventListener("click", lessArticles);
}

function lessArticles() {
  smallArticles = smallArticleContainer.querySelectorAll(".article");
  allExceptThreeSmallArticles = smallArticleContainer.querySelectorAll(".article:not(:nth-child(-n + 3))");

  allExceptThreeSmallArticles.forEach((article) => {
    article.classList.add("article--hidden");
  });
  button.textContent = "More Articles";

  button.removeEventListener("click", lessArticles);
  button.addEventListener("click", moreArticles);
}

button.addEventListener("click", moreArticles);

articleChange();
