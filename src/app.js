function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let amOrPm = "AM";
  if (hours >= 12) {
    amOrPm = "PM";
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = "12";
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}${amOrPm}`;
}
function formatDate(timestamp) {
  let formattedDate = new Date(timestamp);
  let date = formattedDate.getDate();
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
    "October",
    "November",
    "December",
  ];
  let month = months[formattedDate.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[formattedDate.getDay()];
  return `${day}, ${month} ${date}`;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayDailyForecast(response) {
  let dailyForecastElement = document.querySelector("#daily-forecast");

  let dailyForecast = response.data.daily;

  let dailyForecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      dailyForecastHTML =
        dailyForecastHTML +
        `
      <div class="col-2">
        <div class="daily-forecast-date">${formatForecastDate(
          forecastDay.dt
        )}</div>
        <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="icon1"
          width="60"
         />
        <div class="daily-forecast-temperature">
          <span class="daily-forecast-temperature-max id="temperature-element">${Math.round(
            forecastDay.temp.max
          )}° </span> |
          <span class="daily-forecast-temperature-min" id="temperature-element">${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  dailyForecastHTML = dailyForecastHTML + `</div>`;
  dailyForecastElement.innerHTML = dailyForecastHTML;
}

function getDailyForecast(coordinates) {
  let apiKey = "af769be7365d5beaa284c2fd49ab6ea1";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayDailyForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let locationElement = document.querySelector("#location-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let feelsLikeElement = document.querySelector("#feels-like");
  let minTempElement = document.querySelector("#min-temp");
  let maxTempElement = document.querySelector("#max-temp");
  let timeElement = document.querySelector("#update-time");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;
  fahrenheitMin = response.data.main.temp_min;
  fahrenheitMax = response.data.main.temp_max;
  fahrenheitFeelsLike = response.data.main.feels_like;

  let country = response.data.sys.country;
  let city = response.data.name;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  locationElement.innerHTML = `${city}, ${country}`;
  conditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getDailyForecast(response.data.coord);
}

function search(city) {
  let apiKey = "af769be7365d5beaa284c2fd49ab6ea1";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
///////Convert Fahrenheit to Celsius//////////
function getCelsius(temp) {
  return Math.round(((temp - 32) * 5) / 9);
}
//////Min & Max Conversion F to C/////////
function minMaxCelsius(unit, minTemp, maxTemp) {}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let minTempElement = document.querySelector("#min-temp");
  let maxTempElement = document.querySelector("#max-temp");
  let feelsLikeElement = document.querySelector("#feels-like");

  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let celsiusMin = ((fahrenheitMin - 32) * 5) / 9;
  minTempElement.innerHTML = Math.round(celsiusMin);

  let celsiusMax = ((fahrenheitMax - 32) * 5) / 9;
  maxTempElement.innerHTML = Math.round(celsiusMax);

  let celsiusFeelsLike = ((fahrenheitFeelsLike - 32) * 5) / 9;
  feelsLikeElement.innerHTML = Math.round(celsiusFeelsLike);

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
  document.querySelector("#min-temp").innerHTML = Math.round(fahrenheitMin);
  document.querySelector("#max-temp").innerHTML = Math.round(fahrenheitMax);
  document.querySelector("#feels-like").innerHTML =
    Math.round(fahrenheitFeelsLike);

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let fahrenheitTemperature = null;

function showPosition(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "af769be7365d5beaa284c2fd49ab6ea1";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("New York");
