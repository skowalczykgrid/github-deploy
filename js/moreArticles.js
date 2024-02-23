const articles = document.querySelectorAll(".article");
let smallArticleContainer = document.querySelector(".articles__small");
let bigArticleContainer = document.querySelector(".articles__big");
let smallArticles = smallArticleContainer.querySelectorAll(".article");

const button = document.querySelector(".btn-more-articles");
let allExceptThreeSmallArticles = smallArticleContainer.querySelectorAll(".article:not(:nth-child(-n + 3))");

let viewPortWidth = window.innerWidth;
window.addEventListener("resize", () => (viewPortWidth = window.innerWidth));

function articleChange() {
  articles.forEach((article) => {
    article.addEventListener("click", () => {
      if (article.classList.contains("article--big") || viewPortWidth <= 600) return;

      let articleIndex = Array.from(smallArticleContainer.children).indexOf(article);

      articles.forEach((art) => art.classList.remove("article--big"));
      article.classList.add("article--big");

      let oldBigArticle = bigArticleContainer.querySelector(".article");
      bigArticleContainer.innerHTML = "";
      bigArticleContainer.appendChild(article);

      smallArticleContainer.insertBefore(oldBigArticle, smallArticleContainer.children[articleIndex]);
      smallArticleContainer = document.querySelector(".articles__small");
    });
  });
}

function moreArticles() {
  smallArticles = smallArticleContainer.querySelectorAll(".article");
  smallArticles.forEach((article) => article.classList.remove("article--hidden"));
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
