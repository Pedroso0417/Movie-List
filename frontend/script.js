// Backend API URL
const API_URL = "http://localhost:5000";

// DOM Elements
const movieListElement = document.getElementById("movie-list");
const nowPlayingElement = document.getElementById("now-playing");
const errorElement = document.getElementById("error");
const movieTitleElement = document.getElementById("movie-title");
const movieDescriptionElement = document.getElementById("movie-description");
const movieStreamingElement = document.getElementById("movie-streaming");

// Fetch Movies
const fetchMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movies`);
    if (!response.ok) throw new Error("Failed to fetch movies");
    const movies = await response.json();

    renderMovies(movies);
  } catch (err) {
    showError(err.message);
  }
};

// Render Movie List
const renderMovies = (movies) => {
  if (!Array.isArray(movies)) {
    showError("Invalid movie data. Please try again later.");
    return;
  }
  movieListElement.innerHTML = "";
  movies.forEach((movie) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${movie.title}</span>
      <button onclick="playMovie('${movie.id}')">Play</button>
    `;
    movieListElement.appendChild(listItem);
  });
};

// Play Movie
const playMovie = async (movieId) => {
  try {
    const response = await fetch(`${API_URL}/movies/play/${movieId}`);
    if (!response.ok) throw new Error("Failed to play the movie");
    const { movieData } = await response.json();

    showNowPlaying(movieData);
  } catch (err) {
    showError(err.message);
  }
};

// Show "Now Playing" Section
const showNowPlaying = (movie) => {
  movieTitleElement.textContent = movie.title;
  movieDescriptionElement.textContent =
    movie.description || "No description available.";
  movieStreamingElement.textContent =
    movie.streamingUrl || "Streaming URL not available.";
  nowPlayingElement.classList.remove("hidden");
};

// Show Error Message
const showError = (message) => {
  errorElement.textContent = message;
  setTimeout(() => {
    errorElement.textContent = "";
  }, 3000);
};

// Initialize App
fetchMovies();
