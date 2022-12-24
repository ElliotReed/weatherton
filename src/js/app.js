import * as Elements from "./elements.js";
import * as utils from "./utils.js";
import { createElement } from "./createElement.js";
import "./toggleDisplay.js";
import "./scrollContent.js";

import '../css/normalize.css'
import '../css/style.css'
// Initialize variables
const API_KEY = `6cf9b9c5b948a69676088ed828c5535d`;
const OPEN_WEATHER_API = "api.openweathermap.org/data/2.5";

var geolocationAllowed = false;
const weatherDisplay = document.getElementById("app-container");

function initialize() {
  getData();
  setInterval(() => {
    getData();
  }, 10 * 60 * 1000); // minutes * seconds * milliseconds
}

async function getData() {
  const weatherData = await fetchData();
  buildUI(weatherData);
}

function getUserPosition() {
  return new Promise(function (resolve, geoPositionFail) {
    if (navigator.geolocation) {
      geolocationAllowed = true;
      navigator.geolocation.getCurrentPosition(resolve, geoPositionFail);
    } else {
      weatherDisplay.innerText = "Geolocation is not supported by this browser";
    }
  });

  function geoPositionFail() {
    weatherDisplay.innerText = "Geocoder failed.";
  }
}

async function fetchData() {
  const userPosition = await getUserPosition();
  const queryString = getQueryString(userPosition);
  const requestURL = getRequestURL(queryString);
  return getWeatherData(requestURL);
}

function getQueryString(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  return `lat=${latitude}&lon=${longitude}`;
}

function getRequestURL(queryString) {
  return `${OPEN_WEATHER_API}/onecall?${queryString}&appid=${API_KEY}`;
}

function getWeatherData(requestURL) {
  const weatherData = fetch(`https://${requestURL}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => {
      weatherDisplay.innerText = err.message;
    });

  return weatherData;
}

function buildUI(weatherData) {
  Elements.setUnits("imperial");
  buildAlert(weatherData.alerts);
  buildCurrentWeatherFeature(weatherData.current);
  TodaysForecast(weatherData.daily[0]);
  buildHourlyForecastFeature(weatherData.hourly);
  buildDailyForecastFeature(weatherData.daily);
  // console.log("weatherData: ", weatherData);
}

function buildAlert(alerts) {
  if (!alerts) {
    console.warn("There are no weather alerts in this area.");
    return;
  }
  const alertContainer = document.getElementById("alert");
  const Alert = Elements.createAlert(alerts);
  alertContainer.innerHTML = "";
  alertContainer.appendChild(Alert);
}

function buildCurrentWeatherFeature(weatherData) {
  const {
    clouds,
    dew_point,
    dt,
    humidity,
    rain,
    snow,
    sunrise,
    sunset,
    uvi,
    weather,
  } = weatherData;

  const body = document.getElementById("body");
  const currentWeatherContainer = document.getElementById(
    "current-weather__container"
  );
  const dayOrNight = utils.getDayOrNight(true, weatherData);
  let oWeather = weather[0];

  const cloudinessElement = Elements.createCloudsElement(clouds);
  const dateTimeElement = Elements.createDateTimeElement(dt, {
    includesYear: true,
    includesTime: true,
  });
  const descriptionNode = Elements.createWeatherDescriptionElement(
    oWeather.description
  );
  const dewPointElement = Elements.createDewPointElement(dew_point);
  const humidtyElement = Elements.createHumidityElement(humidity);
  const iconElement = Elements.WeatherIcon(oWeather, "large");
  const pressureElement = Elements.createPressureElement(
    weatherData.pressure,
    76
  );
  const rainElement = Elements.createRainElement(rain);
  const snowElement = Elements.createSnowElement(snow);
  const sunriseSunsetElement = Elements.createSunriseSunsetElement(
    weatherData,
    100
  );
  const sunriseElement = Elements.createSunriseElement(sunrise);
  const sunsetElement = Elements.createSunsetElement(sunset);
  const temperatureElement = Elements.createTemperatureElement(weatherData);
  const visibilityElement = Elements.createVisibilityElement(
    weatherData.visibility
  );
  const windElement = Elements.createWindElement(weatherData, 76);
  const uviElement = Elements.createUviElement(uvi);

  // TODO get city name
  body.classList.add(dayOrNight);
  currentWeatherContainer.innerHTML = "";
  currentWeatherContainer.append(
    dateTimeElement,
    iconElement,
    temperatureElement,
    descriptionNode,
    weatherData.snow != undefined ? snowElement : "",
    weatherData.rain != undefined ? rainElement : "",
    pressureElement,
    windElement,
    cloudinessElement,
    visibilityElement,
    humidtyElement,
    dewPointElement,
    uviElement,
    sunriseElement,
    sunsetElement
  );
}

function buildHourlyForecastFeature(weatherDataList) {
  const forecastContainer = document.getElementById(
    "hourly-weather__container"
  );
  forecastContainer.innerHTML = "";
  weatherDataList.map((weatherData) => {
    const weather = weatherData.weather[0];
    const dateTimeElement = Elements.createDateTimeElement(weatherData.dt, {
      includesTime: true,
      includesDay: false,
    });
    const probabilityOfPrecipitaionElement =
      Elements.createProbabilityOfPrecipitaionElement(weatherData.pop);
    const rainElement = Elements.createRainElement(weatherData.rain);
    const snowElement = Elements.createSnowElement(weatherData.snow);
    const WeatherIcon = Elements.WeatherIcon(weather);
    const temperatureElement = Elements.createTemperatureElement(weatherData);
    const weatherMainElement = Elements.createWeatherMainElement(
      weather.main,
      weather.description
    );
    const weatherDescriptionElement = Elements.createWeatherDescriptionElement(
      weather.description
    );
    const windElement = Elements.createWindElement(weatherData);
    const pressureElement = Elements.createPressureElement(
      weatherData.pressure
    );
    const uviElement = Elements.createUviElement(weatherData.uvi);

    const div = createElement(
      "div",
      { class: "card" },
      dateTimeElement,
      WeatherIcon,
      temperatureElement,
      probabilityOfPrecipitaionElement,
      weatherData.snow != undefined ? snowElement : "",
      weatherData.rain != undefined ? rainElement : "",
      // weatherMainElement,
      // weatherDescriptionElement,
      windElement,
      // pressureElement,
      uviElement
    );
    forecastContainer.appendChild(div);
  });
}

function buildDailyForecastFeature(weatherDataList) {
  const forecastContainer = document.getElementById("daily-weather__container");
  forecastContainer.innerHTML = "";
  weatherDataList.map((weatherData) => {
    const weather = weatherData.weather[0];

    const dateTimeElement = Elements.createDateTimeElement(weatherData.dt);
    const highLowElement = Elements.createTemperatureMaxMinElement(
      weatherData.temp
    );
    const rainElement = Elements.createRainElement(weatherData.rain);
    const snowElement = Elements.createSnowElement(weatherData.snow);
    const probabilityOfPrecipitaionElement =
      Elements.createProbabilityOfPrecipitaionElement(weatherData.pop);
    const temperatureElement = Elements.DailyTemperature(weatherData);
    const weatherMainElement = Elements.createWeatherMainElement(
      weather.main,
      weather.descriptions
    );
    const uviElement = Elements.createUviElement(weatherData.uvi);
    const weatherDescriptionElement = Elements.createWeatherDescriptionElement(
      weather.description
    );
    const WeatherIcon = Elements.WeatherIcon(weather);
    const windElement = Elements.createWindElement(weatherData);
    const pressureElement = Elements.createPressureElement(
      weatherData.pressure,
      60
    );

    const div = createElement(
      "div",
      { class: "card daily-forecast" },
      dateTimeElement,
      WeatherIcon,
      weatherDescriptionElement,
      highLowElement,
      weatherData.rain != undefined ? rainElement : "",
      weatherData.snow != undefined ? snowElement : "",
      probabilityOfPrecipitaionElement,
      temperatureElement,
      // weatherMainElement,
      windElement,
      // pressureElement,
      uviElement
    );

    forecastContainer.appendChild(div);
  });
}

function TodaysForecast(weatherData) {
  const todaysForecastContainer = document.getElementById(
    "today-weather__container"
  );
  const weather = weatherData.weather[0];
  const WeatherIcon = Elements.WeatherIcon(weather);
  const probabilityOfPrecipitaionElement =
    Elements.createProbabilityOfPrecipitaionElement(weatherData.pop);
  const rainElement = Elements.createRainElement(weatherData.rain);
  const snowElement = Elements.createSnowElement(weatherData.snow);
  const dailyTemperatureElement = Elements.DailyTemperature(weatherData);
  const weatherMainElement = Elements.createWeatherMainElement(
    weather.main,
    weather.description
  );
  const highLowElement = Elements.createTemperatureMaxMinElement(
    weatherData.temp
  );

  const todayForecast = createElement(
    "div",
    { class: "card today-forecast" },
    WeatherIcon,
    highLowElement,
    weatherMainElement,
    probabilityOfPrecipitaionElement,
    weatherData.rain != undefined ? rainElement : "",
    weatherData.snow != undefined ? snowElement : "",
    dailyTemperatureElement
  );

  todaysForecastContainer.innerHTML = "";
  todaysForecastContainer.appendChild(todayForecast);
}

initialize();

function toggleAlert() {
  const alertContainer = document.querySelector(".alert__container");
  alertContainer.classList.toggle("display");
}

function removeAlert() {
  const alertContainer = document.querySelector(".alert__container");
  if (!alertContainer) return;
  alertContainer.classList.remove("display");
}

document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("notice-btn")) {
    toggleAlert();
    return;
  }

  removeAlert();
});
