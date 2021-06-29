function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#location-city");
  cityElement.innerHTML = response.data.name;
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  let minTempElement = document.querySelector("#min-temp");
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  let maxTempElement = document.querySelector("#max-temp");
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
}

let apiKey = "af769be7365d5beaa284c2fd49ab6ea1";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Milwaukee&units=${units}&appid=${apiKey}`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
