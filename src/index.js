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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  forecast = forecast.slice(0, 5);

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mar", "Mie", "Jue", "Vie", "Sab"];

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <p class="weather-forecast-date">${formatDay(forecastDay.dt)}</p>
              <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="forecast"
            width="70"
            id="icon-forecast"
          />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

//Search button
function showData(response) {
  document.getElementById("celsius").classList.add("format-select");
  document.getElementById("farenheit").classList.remove("format-select");

  let citySelector = document.querySelector("#city");
  citySelector.innerHTML = `${response.data.name}`;

  let countrySelector = document.querySelector("#country");
  countrySelector.innerHTML = `${response.data.sys.country}`;

  let temperatureSelector = document.querySelector("#actual-temperature");
  temperatureSelector.innerHTML = `${Math.round(response.data.main.temp)}`;
  celsiusTemperature = response.data.main.temp;

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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text");
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showData);
}

///Search a City
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

//City by Default
//////////////////////
let apiUrlDefault = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=8944afa6845bd7c413a687258d3211ef`;
axios.get(apiUrlDefault).then(showData);
/////////////////////

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

//Bonus feature

let celsiusTemperature = null;
let fahrenheitTemperature = null;

////////////////////////////////////////////////////////////////////////
function toCelsius() {
  document.getElementById("celsius").classList.add("format-select");
  document.getElementById("farenheit").classList.remove("format-select");
  let temperature = document.querySelector("#actual-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusEvent = document.querySelector("#celsius");
celsiusEvent.addEventListener("click", toCelsius);

function toFahrenheit() {
  document.getElementById("farenheit").classList.add("format-select");
  document.getElementById("celsius").classList.remove("format-select");
  let temperature = document.querySelector("#actual-temperature");
  fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitEvent = document.querySelector("#farenheit");
fahrenheitEvent.addEventListener("click", toFahrenheit);
////////////////////////////////////////////////////////////////////////
