const API_KEY = "ZflFuV00EcktmvizP8EoXp7adOsymktWurUIA7uQ";
const API_URL = "https://api.nasa.gov/planetary/apod";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const imageContainer = document.getElementById("current-image-container");
const searchHistoryList = document.getElementById("search-history");


function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  fetchImage(currentDate);
}


function getImageOfTheDay(date) {
  fetchImage(date);
  saveSearch(date);
  addSearchToHistory();
}


function fetchImage(date) {
  imageContainer.innerHTML = "<p>Loading...</p>";

  fetch(`${API_URL}?date=${date}&api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then(data => {
      displayImage(data);
    })
    .catch(error => {
      imageContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}


function displayImage(data) {
  imageContainer.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.date}</p>
    ${
      data.media_type === "image"
        ? `<img src="${data.url}" alt="${data.title}" />`
        : `<iframe src="${data.url}" frameborder="0"></iframe>`
    }
    <p>${data.explanation}</p>
  `;
}


function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];

  // prevent duplicate dates
  const exists = searches.some(item => item.date === date);
  if (!exists) {
    searches.push({ date: date });
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}


function addSearchToHistory() {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  searchHistoryList.innerHTML = "";

  searches.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.date;

    li.addEventListener("click", () => {
      fetchImage(item.date);
    });

    searchHistoryList.appendChild(li);
  });
}



form.addEventListener("submit", function (e) {
  e.preventDefault();
  const selectedDate = input.value;
  getImageOfTheDay(selectedDate);
});


getCurrentImageOfTheDay();
addSearchToHistory();
