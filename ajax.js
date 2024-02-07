function searchMovie() {
  // Get user input
  var movieTitle = document.getElementById("movie").value;

  // Check if the input is not empty
  if (movieTitle.trim() === "") {
    alert("Please enter a movie title.");
    return;
  }

  // Make an AJAX request
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Parse the JSON response
        var data = JSON.parse(xhr.responseText);

        // Check if the movie was found
        if (data.Response === "True") {
          // Display the fetched data on the webpage
          displayMovie(data);
        } else {
          // Handle errors
          handleError("Movie not found. Please enter a valid movie title.");
        }
      } else {
        // Handle errors
        handleError("Failed to fetch movie data. Please try again.");
      }
    }
  };

  // Open a GET request to the OMDB API
  xhr.open(
    "GET",
    "http://www.omdbapi.com/?t=" +
      encodeURIComponent(movieTitle) +
      "&apikey=10f5de28",
    true
  );

  xhr.send();
}

function displayMovie(data) {
  // Extract relevant information from the API response
  var title = data.Title;
  var year = data.Year;
  var plot = data.Plot;

  // Display the information on the webpage
  var resultContainer = document.getElementById("result");
  resultContainer.innerHTML =
    "<p>Title: " +
    title +
    "</p>" +
    "<p>Year: " +
    year +
    "</p>" +
    "<p>Plot: " +
    plot +
    "</p>";
}

function handleError(message) {
  // Display an error message on the webpage
  var resultContainer = document.getElementById("result");
  resultContainer.innerHTML = '<p style="color: red;">' + message + "</p>";
}
