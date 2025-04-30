const apiKey = "AIzaSyDBUOvl7dORuEal9d-W3I0v2Ev_FCma1L8";

const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

const googleAPIUrl = "https://www.googleapis.com/youtube/v3/search";

searchButton.addEventListener("click", () => {
  const searchTerm = document.getElementById("searchQuery").value;
  const query = `?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(searchTerm)}&key=${apiKey}`;
  const url = googleAPIUrl + query;

  fetch(url)
    .then(response => response.json())
    .then(results => {
      resultsDiv.innerHTML = ""; // clear previous results

      results.items.forEach(item => {
        if (item.id.videoId) {
          const link = `https://www.youtube.com/watch?v=${item.id.videoId}`;
          const title = item.snippet.title;
          const thumbnail = item.snippet.thumbnails.medium.url;

          resultsDiv.innerHTML += `
            <div style="margin-bottom: 20px;">
              <a href="${link}" target="_blank">
                <img src="${thumbnail}" alt="${title}" style="display:block; max-width:300px; margin-bottom:5px;">
                <strong>${title}</strong>
              </a>
            </div>
          `;
        }
      });
    })
    .catch(error => {
      resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    });
});