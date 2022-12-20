// Initialize variables
const API_KEY = `6cf9b9c5b948a69676088ed828c5535d`;
const OPEN_WEATHER_API = "api.openweathermap.org/data/2.5/";

var geolocationAllowed = false;
const weatherDisplay = document.getElementById("app-container");

let weatherData = {};

const componentTypes = [
  {
    type: "currentWeather",
    endpoint: `weather?`,
    list: false,
    baseElementId: "current-display",
    ulClass: "current-ul",
  },
  {
    type: "fiveDayForecast",
    endpoint: `forecast?`,
    list: true,
    baseElementId: "forecast-wrapper",
    ulClass: "forecast-ul",
  },
];

initialize();

function initialize() {
  initializeCurrentWeather();
  initializeFiveDayForecast();
  newWeather();
}

async function newWeather() {
  const position = await getUserPosition();
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const latitudeLongitudeString = `lat=${latitude}&lon=${longitude}`;
  const queryString = `api.openweathermap.org/data/2.5/onecall?${latitudeLongitudeString}&appid=${API_KEY}`;
  data = await getWeatherData(queryString);
  weatherData = data;
  console.log(data);
  dailyWeather(weatherData.daily);
}

function dailyWeather(data) {
  const container = document.createElement("ul");
  data.map((item) => {
    const main = createWeatherMainElement(item);
    const icon = createWeatherIcon(item);
    const datetime = document.createElement("li");
    datetime.innerText = new Date(item.dt).toDateString();
    console.log(item.weather[0].main);
    container.appendChild(icon);
    container.appendChild(main);
    container.appendChild(datetime);
  });
  weatherDisplay.appendChild(container);
}

function initializeCurrentWeather() {
  currentWeather();
  setInterval(() => {
    currentWeather();
  }, 10 * 60 * 1000); // minutes * seconds * milliseconds
}

function initializeFiveDayForecast() {
  fiveDayForecast();
  setInterval(() => {
    fiveDayForecast();
  }, 3 * 60 * 60 * 1000); // hours * minutes * seconds * milliseconds
}

function getComponentType(componentTypeString) {
  const component = componentTypes.filter(
    (component) => component.type === componentTypeString
  )[0];
  return component;
}

async function currentWeather() {
  const component = await getComponentType("currentWeather");
  const position = await getUserPosition();
  const queryString = await buildQueryString(component, position);
  const requestURL = await buildRequestURL(queryString);
  const weatherData = await getWeatherData(requestURL);
  displayWeather(component, weatherData);
}

async function fiveDayForecast() {
  const component = await getComponentType("fiveDayForecast");
  const position = await getUserPosition();
  const queryString = await buildQueryString(component, position);
  const requestURL = await buildRequestURL(queryString);
  const weatherData = await getWeatherData(requestURL);
  displayWeather(component, weatherData);
}

function buildRequestURL(queryString) {
  return `${OPEN_WEATHER_API}${queryString}&appid=${API_KEY}`;
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

function buildQueryString(component, position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const latitudeLongitudeString = `lat=${latitude}&lon=${longitude}`;

  return component.endpoint + latitudeLongitudeString;
}

function getWeatherData(requestURL) {
  const weatherData = fetch(`https://${requestURL}`)
    .then(function success(response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
  return weatherData;
}

function displayWeather(component, data) {
  let list;
  let listItem;
  let baseElement = document.getElementById(component.baseElementId);
  let currentWeather = false;

  if (component.type === "currentWeather") {
    currentWeather = true;
  }

  // Remove previous component
  const oldUl = document.querySelector(`.${component.ulClass}`);
  if (oldUl) {
    baseElement.removeChild(oldUl);
  }

  // Convert all data to array for processing
  if (!component.list) {
    list = [data];
  } else {
    list = data.list;
  }

  // Process component
  for (listItem of list) {
    const ul = document.createElement("ul");
    ul.appendChild(createWeatherIcon(listItem));
    ul.appendChild(createTemperatureElement(listItem));
    ul.appendChild(createWeatherMainElement(listItem));

    const dayOrNight = getDayOrNight(currentWeather, listItem);

    if (currentWeather) {
      ul.appendChild(createCityNameElement(listItem));
      ul.appendChild(createSunriseSunsetElement(listItem));
      document
        .getElementById("app-wrapper")
        .setAttribute("class", `${dayOrNight}`);
    } else {
      ul.classList.add(`${dayOrNight}`);
      ul.appendChild(createDateTimeElement(listItem));
    }

    ul.classList.add(`${component.ulClass}`);
    baseElement.appendChild(ul);
  }
}

function getDayOrNight(currentWeather, listItem) {
  let dayOrNight = "night";
  const now = new Date();
  const time = new Date(listItem.dt * 1000);
  const sunrise = new Date(listItem.sys.sunrise * 1000);
  const sunset = new Date(listItem.sys.sunset * 1000);

  if (!currentWeather) {
    const hour = time.getHours();
    if (hour >= 8 && hour <= 20) {
      dayOrNight = "day";
    }
  } else if (now > sunrise && now < sunset) {
    dayOrNight = "day";
  }

  return dayOrNight;
}

function createDateTimeElement(listItem) {
  const dayName = new Date(listItem.dt_txt).toDateString().split(" ")[0];
  const month = new Date(listItem.dt_txt).toDateString().split(" ")[1];
  const day = new Date(listItem.dt_txt).toDateString().split(" ")[2];
  const time = new Date(listItem.dt).getTime();

  const li = document.createElement("li");
  const forecastDayElement = document.createElement("div");
  const forecastTimeElement = document.createElement("div");

  li.setAttribute("class", "date-time");
  li.setAttribute("title", `${month} ${day}`);
  forecastDayElement.setAttribute("class", "date-day");
  forecastDayElement.innerText = dayName;

  forecastTimeElement.setAttribute("class", "date-hour");
  forecastTimeElement.innerText = convertTime(time);

  li.appendChild(forecastDayElement);
  li.appendChild(forecastTimeElement);

  return li;
}

function createWeatherIcon(listItem) {
  const icon = listItem.weather[0].icon;
  const li = document.createElement("li");
  const img = document.createElement("img");
  li.setAttribute("class", "icon");
  img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  img.alt = `weather icon`;
  li.appendChild(img);
  return li;
}

function createTemperatureElement(listItem) {
  const temperature = listItem.main.temp;
  const li = document.createElement("li");
  li.setAttribute("class", "temperature");
  li.innerText = `${convertTemperature(temperature, "Kelvin", "Fahrenheit")}`;
  return li;
}

function createWeatherMainElement(listItem) {
  const main = listItem.weather[0].main;
  const description = listItem.weather[0].description;
  const li = document.createElement("li");
  li.setAttribute("class", "main");
  li.setAttribute("title", `${description}`);
  li.innerText = `${main}`;
  return li;
}

function createWeatherDescriptionElement(description) {
  const li = document.createElement("li");
  li.setAttribute("class", "description");
  li.innerText = `${description}`;
  return li;
}

function createCityNameElement(listItem) {
  const city = listItem.name;
  const li = document.createElement("li");
  li.setAttribute("class", "city");
  li.innerText = `${city}`;
  return li;
}

function createSunriseSunsetElement(listItem) {
  const sunrise = listItem.sys.sunrise;
  const sunset = listItem.sys.sunset;

  const li = document.createElement("li");
  const sunriseElement = document.createElement("div");
  const sunsetElement = document.createElement("div");

  li.setAttribute("class", "sunrise-sunset");
  sunriseElement.setAttribute("class", "sunrise");
  sunriseElement.innerText = `Sunrise: ${convertTime(sunrise)}`;
  sunsetElement.setAttribute("class", "sunset");
  sunsetElement.innerText = `Sunset: ${convertTime(sunset)}`;
  li.appendChild(sunriseElement);
  li.appendChild(sunsetElement);

  return li;
}

function convertTime(time) {
  const date = new Date(time * 1000);
  const minutes = date.getMinutes().toString().padStart(2, "0");
  let convertedTime;
  let meridiem = `AM`;
  let hours = date.getHours();

  if (hours === 0) {
    hours = 12;
  } else if (hours === 12) {
    meridiem = `PM`;
  } else if (hours > 12) {
    hours = hours - 12;
    meridiem = `PM`;
  }

  convertedTime = `${hours}:${minutes} ${meridiem}`;

  return convertedTime;
}

function convertTemperature(temperature, fromScale, toScale) {
  if (fromScale === toScale) return temperature;
  switch (fromScale) {
    case "Kelvin":
      if (toScale === "Fahrenheit") {
        return `${parseInt((temperature * 9) / 5 - 459.67)}`;
      } else if (toScale === "Celsius") {
        return `${parseInt(temperature - 273.15)}`;
      }
    case "Celsius":
      if (toScale === "Fahrenheit") {
        return `${parseInt((temperature * 9) / 5 + 32)}`;
      } else if (toScale === "Kelvin") {
        return `${parseInt(temperature + 273.15)}`;
      }
    case "Fahrenheit":
      if (toScale === "Kelvin") {
        return `${parseInt(((temperature + 459.67) * 9) / 5)}`;
      } else if (toScale === "Celsius") {
        return `${parseInt(((temperature - 32) * 9) / 5)}`;
      }
      break;
    default:
      return `${temperature}`;
  }
}
