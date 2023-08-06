//Feature #1

function updateDate() {
  let now = new Date();
  let date = now.getDate(); //día (num)

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = now.getDay();
  day = days[day];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octuber",
    "November",
    "December",
  ];
  let month = now.getMonth();
  month = months[month];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let daySelector = document.querySelector("#day");
  daySelector.innerHTML = day + ",";

  let dateSelector = document.querySelector("#date");
  dateSelector.innerHTML = date;

  let monthSelector = document.querySelector("#month");
  monthSelector.innerHTML = month;

  let hourSelector = document.querySelector("#hour");
  hourSelector.innerHTML = hours + ":";

  let minutesSelector = document.querySelector("#minutes");
  minutesSelector.innerHTML = minutes;
}

let celsiusEvent = document.querySelector("#search-button");
celsiusEvent.addEventListener("click", updateDate);

//Bonus feature
function toCelsius() {
  let temperature = document.querySelector("#actual-temperature");
  temperature.innerHTML = "32°C";
}

let updateEvent = document.querySelector("#celsius");
updateEvent.addEventListener("click", toCelsius);

function toFahrenheit() {
  let temperature = document.querySelector("#actual-temperature");
  temperature.innerHTML = "89,6°F";
}

let fahrenheitEvent = document.querySelector("#farenheit");
fahrenheitEvent.addEventListener("click", toFahrenheit);

//Homework Week 5

//Search button
function showData(response) {
  let citySelector = document.querySelector("#city");
  citySelector.innerHTML = `${response.data.name}`;

  let countrySelector = document.querySelector("#country");
  countrySelector.innerHTML = `${response.data.sys.country}`;

  let temperatureSelector = document.querySelector("#actual-temperature");
  temperatureSelector.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let descriptionSelector = document.querySelector("#description");
  descriptionSelector.innerHTML = response.data.weather[0].main;

  let windSelector = document.querySelector("#wind");
  windSelector.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  let humiditySelector = document.querySelector("#humidity");
  humiditySelector.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let minSelector = document.querySelector("#min");
  minSelector.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;

  let maxSelector = document.querySelector("#max");
  maxSelector.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;

  console.log(response);
}

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text");
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showData);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

function searchPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", searchPosition);
