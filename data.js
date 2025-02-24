const blogContainer = document.getElementById("blog-container");
const search = document.getElementById("search-input");
const searchbtn = document.getElementById("search-button");

function NewsFetching() {
  async function fetchRandomNews() {
    try {
      const apiUrl = `https://news-site-server.vercel.app/us/${search.value}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      const filteredArticles = data.articles.filter(
        (article) =>
          article.description !== null &&
          article.urlToImage !== null &&
          article.urlToImage !== ""
      );

      return filteredArticles;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");

      const img = document.createElement("img");
      img.src = article.urlToImage;
      img.alt = article.title;

      img.onload = () => {
        img.classList.add("loaded");
      };

      const authorname = document.createElement("h4");

      const dateObj = new Date(article.publishedAt);
      const formattedDate = `${dateObj.getDate()}/${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")}/${dateObj.getFullYear()}`;

      authorname.textContent = article.author
        ? `Published On ${formattedDate} By ${article.author}`
        : `Published On ${formattedDate} By Unknown`;

      const title = document.createElement("h2");
      const truncatedTitle =
        article.title.length > 100
          ? article.title.slice(0, 100) + "...."
          : article.title;

      title.textContent = truncatedTitle;

      const description = document.createElement("p");
      const truncatedDes =
        article.description.length > 120
          ? article.description.slice(0, 120) + "...."
          : article.description;
      description.textContent = truncatedDes;

      const infobtn = document.createElement("button");
      infobtn.textContent = "More Info";
      infobtn.classList.add("more-info-btn");

      infobtn.addEventListener("click", () => {
        window.open(article.url, "_blank");
      });

      blogCard.appendChild(img);
      blogCard.appendChild(authorname);
      blogCard.appendChild(title);
      blogCard.appendChild(description);
      blogCard.appendChild(infobtn);

      blogContainer.appendChild(blogCard);
    });
  }

  (async () => {
    try {
      const articles = await fetchRandomNews();
      displayBlogs(articles);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  })();
}

searchbtn.addEventListener("click", function () {
  blogContainer.innerHTML = "";
  NewsFetching();
});

NewsFetching();
