const apiKey = "AIzaSyDBUOvl7dORuEal9d-W3I0v2Ev_FCma1L8"

const search = document.getElementById("searchButton")

const googleAPIUrl = "https://www.googleapis.com/youtube/v3/search"

searchButton.addEventListener("click", (e) => {

    const searchTerm = document.getElementById("searchQuery").value;

    const apiPrefix = "&key=";

    const searchQuery = "?part=snippet&q=" + searchTerm + apiPrefix + apiKey;

    const url = googleAPIUrl + searchQuery;
    
    fetch(url);

});