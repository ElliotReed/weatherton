import * as Elements from "./elements.js";
import { createElement } from "./createElement.js";
import { getDayBackgroundOpacity, getForecastOpacityOptions } from "./dayBackgroundOpacity.js";
import "./slider.js";
import "./toggleDisplay.js";
import "./scrollContent.js";

import '../css/normalize.css'
import '../css/style.css'

let API_KEY = ''; // set in initialize
const OPEN_WEATHER_API = "api.openweathermap.org/data/2.5";
const FETCH_KEY_URL = 'https://api.elliotreed.net/key/weatherton';

let geolocationAllowed = false;
const root = document.documentElement;
const weatherDisplay = document.getElementById("app-container");

async function initialize() {
  API_KEY = await getKey();
  getData();
  setInterval(() => {
    getData();
  }, 10 * 60 * 1000); // minutes * seconds * milliseconds
}

async function getData(key) {
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

async function getKey() {
  const response = await fetch(FETCH_KEY_URL);
  const data = await response.json();
  return data.key;

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
  buildHourlyForecastFeature(weatherData);
  buildDailyForecastFeature(weatherData.daily);
  root.style.setProperty('--dayBackgroundOpacity', getDayBackgroundOpacity(weatherData.current));

  return true;
}

function buildAlert(alerts) {
  const css = `
    background:  #6ea0d2;
    color: #fcf4f1;
  `
  if (!alerts) {
    console.log("%c There are no weather alerts in this area.", css);
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

  const currentWeatherContainer = document.getElementById(
    "current-weather__container"
  );
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
  // TODO: implement
  // const sunriseSunsetElement = Elements.createSunriseSunsetElement(
  //   weatherData,
  //   100
  // );
  const sunriseElement = Elements.createSunriseElement(sunrise);
  const sunsetElement = Elements.createSunsetElement(sunset);
  const temperatureElement = Elements.createTemperatureElement(weatherData);
  const visibilityElement = Elements.createVisibilityElement(
    weatherData.visibility
  );
  const windElement = Elements.createWindElement(weatherData, 76);
  const uviElement = Elements.createUviElement(uvi);

  // TODO get city name
  // body.classList.add(dayOrNight);
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

function buildHourlyForecastFeature(weatherData) {
  const forecastContainer = document.getElementById(
    "hourly-weather__container"
  );
  const weatherDataList = weatherData.hourly;
  forecastContainer.innerHTML = "";
  weatherDataList.map((forecastData) => {
    const weather = forecastData.weather[0];
    const dateTimeElement = Elements.createDateTimeElement(forecastData.dt, {
      includesTime: true,
      includesDay: false,
    });
    const probabilityOfPrecipitaionElement =
      Elements.createProbabilityOfPrecipitaionElement(forecastData.pop);
    const rainElement = Elements.createRainElement(forecastData.rain);
    const snowElement = Elements.createSnowElement(forecastData.snow);
    const WeatherIcon = Elements.WeatherIcon(weather);
    const temperatureElement = Elements.createTemperatureElement(forecastData);
    const weatherMainElement = Elements.createWeatherMainElement(
      weather.main,
      weather.description
    );
    const weatherDescriptionElement = Elements.createWeatherDescriptionElement(
      weather.description
    );
    const windElement = Elements.createWindElement(forecastData);
    const pressureElement = Elements.createPressureElement(
      forecastData.pressure
    );
    const uviElement = Elements.createUviElement(forecastData.uvi);

    const div = createElement(
      "div",
      { class: "card" },
      dateTimeElement,
      WeatherIcon,
      temperatureElement,
      probabilityOfPrecipitaionElement,
      forecastData.snow != undefined ? snowElement : "",
      forecastData.rain != undefined ? rainElement : "",
      // weatherMainElement,
      // weatherDescriptionElement,
      windElement,
      // pressureElement,
      uviElement
    );

    const options = getForecastOpacityOptions(forecastData, weatherData);
    const hourlyOpacity = getDayBackgroundOpacity(options);
    const background = `linear-gradient(to top, rgb(110 160 210 / ${hourlyOpacity}), rgb(160 193 224 / ${hourlyOpacity}))`;
    div.style.background = background;

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
