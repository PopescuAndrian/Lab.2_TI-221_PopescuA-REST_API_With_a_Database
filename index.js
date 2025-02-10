document.addEventListener("DOMContentLoaded", function () {
  const fetchHomeButton = document.getElementById("fetchHome");
  const fetchAskRedditButton = document.getElementById("fetchAskReddit");

  if (fetchHomeButton) {
      fetchHomeButton.addEventListener("click", function () {
          localStorage.setItem("subreddit", "Home");
          window.location.href = "threads.html"; // Redirect to threads page
      });
  }

  if (fetchAskRedditButton) {
      fetchAskRedditButton.addEventListener("click", function () {
          localStorage.setItem("subreddit", "AskReddit");
          window.location.href = "threads.html"; // Redirect to threads page
      });
  }

  // If we are on threads.html, fetch the Reddit data
  if (window.location.pathname.includes("threads.html")) {
      fetchRedditThreads();
  }
});

function fetchRedditThreads() {
  const subreddit = localStorage.getItem("subreddit") || "Home"; // Default to Home
  console.log(`Fetching Reddit threads from r/${subreddit}...`);

  const url = `https://www.reddit.com/r/${subreddit}.json`;

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log("Data received:", data);
          const posts = data.data.children;
          const threadsList = document.getElementById("threads");
          threadsList.innerHTML = ""; // Clear previous results

          if (posts.length === 0) {
              threadsList.innerHTML = "<li>No threads found.</li>";
              return;
          }

          posts.forEach(post => {
              const listItem = document.createElement("li");
              listItem.innerHTML = `<a href="https://www.reddit.com${post.data.permalink}" target="_blank">${post.data.title}</a>`;
              threadsList.appendChild(listItem);
          });
      })
      .catch(error => console.error("Error fetching data:", error));
}
