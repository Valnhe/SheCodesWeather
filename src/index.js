function getDate(dt, timezone) {
  const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
  const utc_milliseconds = utc_seconds * 1000;
  const local_date = new Date(utc_milliseconds).toUTCString();
  let parts = local_date.split(" ");
  let day = parts[0].slice(0, -1);
  let date = parts[1];
  let month = parts[2];

  let formatDate = `${day}, ${date} ${month}`;
  return formatDate;
}

function getTime(dt, timezone) {
  const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
  const utc_milliseconds = utc_seconds * 1000;
  const local_date = new Date(utc_milliseconds).toUTCString();
  let parts = local_date.split(" ");

  let time = parts[4];
  time = time.substr(0, 2);
  time = `${time}:00`;
  return time;
}

//Bonus feature
////////////////////////////////////////////////////////////////////////
function toCelsius() {
  let temperature = document.querySelector("#actual-temperature");
  temperature.innerHTML = "32°C";
}

let celsiusEvent = document.querySelector("#celsius");
celsiusEvent.addEventListener("click", toCelsius);

function toFahrenheit() {
  let temperature = document.querySelector("#actual-temperature");
  temperature.innerHTML = "89,6°F";
}

let fahrenheitEvent = document.querySelector("#farenheit");
fahrenheitEvent.addEventListener("click", toFahrenheit);
////////////////////////////////////////////////////////////////////////

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
  windSelector.innerHTML = `${Math.round(response.data.wind.speed * 3.6)} km/h`;

  let humiditySelector = document.querySelector("#humidity");
  humiditySelector.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let minSelector = document.querySelector("#min");
  minSelector.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;

  let maxSelector = document.querySelector("#max");
  maxSelector.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;

  let dateSelector = document.querySelector("#date");
  dateSelector.innerHTML = getDate(response.data.dt, response.data.timezone);

  let timeSelector = document.querySelector("#time");
  timeSelector.innerHTML = getTime(response.data.dt, response.data.timezone);
}

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text");
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showData);
}

//City by Default
//////////////////////
let apiKey = "8944afa6845bd7c413a687258d3211ef";
let apiUrlDefault = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${apiKey}`;
axios.get(apiUrlDefault).then(showData);
/////////////////////

///Search a City
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

//Current Position
/////////////////////////////////////////
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
/////////////////////////////////////////
