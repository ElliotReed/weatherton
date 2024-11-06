import { createCompass } from "./compass.js";
import { drawBarometer } from "./barometer.js";
import { createSunriseSunsetCanvas } from "./sunriseSunset.js";
import { createElement } from "./createElement.js";
import * as utils from "./utils.js";
import raindropImg from '../images/raindrop.svg?url';
// default: kelvin, metric: Celsius, imperial: Fahrenheit.
let units;

function createRaindrop() {
  const droplet = createElement("path", {
    class: "droplet",
    d: "M12.17,10.12C12.38,13.49,10.3,16,8,16s-4.33-2.59-4.18-5.88S8,0,8,0,12,6.88,12.17,10.12Z",
  });
  const style = createElement(
    "style",
    {},
    `  .droplet {
      fill:#6ea0d2;
      stroke: #70879c;
      animation: droplet-animation 1.618s ease alternate infinite
    }
    @keyframes droplet-animation {
      100% {
        fill: #70879c;
      }
    }`
  );

  const raindrop = createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      class: "raindrop",
      "aria-labelledby": "svg raindrop",
      focusable: "false",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
    },
    droplet
    // style
  );

  return raindrop;
}

export function createAlert(alerts = []) {
  // ==============  Uncomment for testing
  // const exampleAlert = {
  //   sender_name: "NWS Boulder (Northeastern Colorado)",
  //   event: "Winter Storm Watch",
  //   start: 1615618800,
  //   end: 1615809600,
  //   description:
  //     "...WINTER STORM WATCH REMAINS IN EFFECT FROM LATE …S...Travel could be very difficult to impossible.",
  // };

  // alerts.push(exampleAlert);
  // =======================================

  const notice = createElement(
    "button",
    { class: "notice-btn danger" },
    alerts[alerts.length - 1].event
  );

  const container = createElement("div", { class: "alert" }, notice);
  const alertContainer = createElement("div", { class: "alert__container scrollbar" });

  alerts.forEach((alert) => {
    // console.warn(alert);
    const endDate = createDateTimeElement(alert.end, { includesTime: true });
    const startDate = createDateTimeElement(alert.start, {
      includesTime: true,
    });
    const joinText = createElement("span", { class: "txt-small" }, ` through `);
    const inEffectString = createElement(
      "div",
      { class: "alert__in-effect" },
      startDate,
      joinText,
      endDate
    );
    const sender = createElement("h5", {}, alert.sender_name);
    const description = createElement("p", {}, alert.description);
    const header = createElement(
      "header",
      { class: "danger padding-box" },
      alert.event
    );
    const article = createElement(
      "article",
      {},
      header,
      // startDate,
      // endDate,
      inEffectString,
      sender,
      description
    );
    alertContainer.appendChild(article);
  });
  container.appendChild(alertContainer);
  return container;
}

export function createCityNameElement(city) {
  const div = document.createElement("div");
  div.setAttribute("class", "city");
  div.innerText = `${city}`;
  return div;
}

export function setUnits(unitsArg) {
  units = unitsArg;
}

export function createCloudsElement(clouds) {
  const label = createElement("span", { class: "label" }, `cloudiness`);
  const content = createElement(
    "span",
    { class: "txt-semi-bold" },
    `${clouds}`
  );
  const cloudinessElement = createElement(
    "p",
    { id: "cloudiness", class: "percent" },
    label,
    content
  );
  return cloudinessElement;
}

function createDateTimeElement(UTCDate, options = {}) {
  // commas should be added through ::after psuedo elements!

  const {
    includesTime = false,
    includesYear = false,
    includesDay = true,
  } = options;
  // converts the Unix time (seconds) to milliseconds
  const convertedDate = UTCDate * 1000;
  const year = new Date(convertedDate).getFullYear();
  const dayName = new Date(convertedDate).toDateString().split(" ")[0];
  const month = new Date(convertedDate).toDateString().split(" ")[1];
  const day = new Date(convertedDate).toDateString().split(" ")[2];
  const time = new Date(UTCDate).getTime();

  const timeElement = createElement(
    "span",
    {
      class: "date-time__hour",
    },
    `${utils.convertTime(time)}`
  );

  const yearElement = createElement(
    "span",
    { class: "date-time__year" },
    `${year}`
  );

  const dayNameElement = createElement(
    "span",
    {
      class: "date-time__day-name",
    },
    dayName
  );

  const dayElement = createElement("span", { class: "date-time__day" }, day);

  const dateElement = createElement(
    "time",
    {
      class: "date date-time",
      title: `${month} ${day}, ${year}`,
      datetime: new Date(convertedDate).toISOString(),
    },
    dayNameElement,
    includesDay ? dayElement : "",
    includesYear ? yearElement : "",
    includesTime ? timeElement : ""
  );

  return dateElement;
}

export function createDewPointElement(dew_point) {
  const convertedDewPoint = utils.convertTemperature(
    dew_point,
    "Kelvin",
    "Fahrenheit"
  );

  const label = createElement("span", { class: "label" }, `dew point`);

  const value = createElement(
    "span",
    { class: "txt-semi-bold" },
    `${convertedDewPoint}`
  );

  const dewPointElement = createElement(
    "p",
    { id: "dew-point", class: "degree" },
    label,
    value
  );
  return dewPointElement;
}

export function createHumidityElement(humidity) {
  const label = createElement("span", { class: "label" }, `humidity`);
  const value = createElement(
    "span",
    { class: "txt-semi-bold" },
    `${humidity}`
  );
  const humidityElement = createElement(
    "p",
    { id: "humidity", class: "droplet percent" },
    label,
    value
  );

  return humidityElement;
}

export function createPressureElement(pressure) {
  const barometer = drawBarometer(pressure);
  const pressureElement = createElement(
    "div",
    { class: "flex-center-all pressure" },
    barometer
  );

  const pressureElementObserver = new ResizeObserver(() => barometer.resize());
  pressureElementObserver.observe(pressureElement);

  return pressureElement;
}

export function createProbabilityOfPrecipitaionElement(pop) {
  const raindropIcon = createElement("img", {
    class: "raindroplet",
    src: raindropImg,
    alt: "",
    width: "16",
    height: "16",
  });

  // const raindropElement = createRaindrop();
  const probabilityOfPrecipitaionElement = createElement(
    "p",
    { class: "probability-precipitation txt-semi-bold percent" },
    raindropIcon,
    `${utils.convertToPercent(pop)}`
  );
  return probabilityOfPrecipitaionElement;
}

export function createRainElement(rain, showLabel = true) {
  // const exampleRain = { "1h": 0.65 };
  let rainfall = rain;
  let convertedVolume;

  if (typeof rain === "object") {
    rainfall = rain["1h"];
  }

  convertedVolume = utils.convertVolume(rainfall, "mm", "inches");

  const label = createElement("span", { class: "label" }, `rain`);

  const units = createElement(
    "span",
    { class: "units" },
    convertedVolume.units
  );

  const value = createElement(
    "span",
    { class: "txt-semi-bold" },
    convertedVolume.value
  );

  const rainElement = createElement(
    "p",
    { class: "rainfall" },
    showLabel ? label : "",
    value,
    units
  );

  return rainElement;
}

export function createSnowElement(snow, showLabel = true) {
  // const exampleSnow = { "1h": 0.65 };
  let snowfall = snow;
  let convertedVolume;

  if (typeof snow === "object") {
    snowfall = snow["1h"];
  }

  convertedVolume = utils.convertVolume(snowfall, "mm", "inches");

  const label = createElement("span", { class: "label" }, `snow`);

  const units = createElement(
    "span",
    { class: "units" },
    convertedVolume.units
  );

  const value = createElement(
    "span",
    { class: "txt-semi-bold" },
    convertedVolume.value
  );

  const snowElement = createElement(
    "p",
    { class: "snowfall" },
    showLabel ? label : "",
    value,
    units
  );

  return snowElement;
}

export function createSunriseSunsetElement(weatherData, canvasSize) {
  const sunriseSunsetElement = createSunriseSunsetCanvas(
    weatherData,
    canvasSize
  );
  return sunriseSunsetElement;
}

export function createSunriseElement(sunrise) {
  const label = createElement("span", { class: "label" }, `sunrise`);
  const sunriseElement = createElement(
    "p",
    { class: "sunrise" },
    label,
    utils.convertTime(sunrise)
  );
  return sunriseElement;
}

export function createSunsetElement(sunset) {
  const label = createElement("span", { class: "label" }, `sunset`);
  const sunsetElement = createElement(
    "p",
    { class: "sunset" },
    label,
    utils.convertTime(sunset)
  );
  return sunsetElement;
}

function createTemperatureValueElement(temp, feels_like) {
  const temperatureValueClass = `degree`;

  function getTemperatureString(value) {
    return `${utils.convertTemperature(value, "Kelvin", "Fahrenheit")}`;
  }

  const slash = createElement("span", { class: "temperature__slash" }, `/`);

  const feelsLikeElement = createElement(
    "span",
    {
      class: `${temperatureValueClass} feels-like`,
      title: `Feels like ${getTemperatureString(feels_like)}`,
    },
    `${getTemperatureString(feels_like)}`
  );

  const actualTemperatureElement = createElement(
    "span",
    {
      class: `${temperatureValueClass} actual`,
      title: `Actual temperature ${getTemperatureString(temp)}`,
    },
    `${getTemperatureString(temp)}`
  );

  const temperatureValueElement = createElement(
    "p",
    { class: "temperature temperature__paragraph" },
    actualTemperatureElement,
    slash,
    feelsLikeElement
  );
  return temperatureValueElement;
}

export function createTemperatureElement(temp, feels_like) {
  if (typeof temp === "object" || typeof feels_like === "object") {
    console.error(
      "WeatherData objects are not allowed, use DailyTemperature() instead"
    );
    return;
  }

  const temperatureValueElement = createTemperatureValueElement(
    temp,
    feels_like
  );
  return temperatureValueElement;
}

export function DailyTemperature(weatherData) {
  const { temp, feels_like } = weatherData;
  if (typeof temp != "object" || typeof feels_like !== "object") {
    console.error(
      "WeatherData objects are required, use createTemperatureElement() instead"
    );
    return;
  }
  const dayTimes = [
    {
      name: "morning",
      value: "morn",
    },
    {
      name: "day",
      value: "day",
    },
    {
      name: "evening",
      value: "eve",
    },
    {
      name: "night",
      value: "night",
    },
  ];

  const dayTimeElements = [];

  dayTimes.forEach((time) => {
    const label = createElement("span", { class: "label" }, time.name);
    const element = createElement(
      "div",
      { class: "daily-temp" },
      label,
      createElement(
        "div",
        {},
        createTemperatureValueElement(temp[time.value], feels_like[time.value])
      )
    );

    dayTimeElements.push(element);
  });

  const temperatureListContainer = createElement(
    "div",
    { class: "temperature-list" },
    dayTimeElements[0],
    dayTimeElements[1],
    dayTimeElements[2],
    dayTimeElements[3]
  );
  return temperatureListContainer;
}

export function createTemperatureMaxMinElement(temp) {
  const temperatureValueClass = `degree`;
  const label = createElement("span", { class: "label" }, `high/low`);

  const min = createElement(
    "span",
    { class: `${temperatureValueClass} value temperature__min` },
    `/${utils.convertTemperature(temp.min, "Kelvin", "Fahrenheit")}`
  );

  const highLowElement = createElement(
    "span",
    { class: `${temperatureValueClass} value` },
    `${utils.convertTemperature(temp.max, "Kelvin", "Fahrenheit")}`
  );

  const temperatureListContainer = createElement(
    "p",
    { class: "high-low" },
    label,
    highLowElement,
    min
  );
  return temperatureListContainer;
}

export function createUviElement(uvi) {
  const label = createElement("span", { class: "label" }, `uv`);
  const value = createElement("span", { class: "value" }, `${uvi}`);
  const uviIndexElement = createElement(
    "p",
    { class: `uvi__index` },
    label,
    value
  );

  const risk = utils.getUviRisk(uvi);
  const riskLabel = createElement("span", { class: "label" }, `UV risk`);
  const riskValue = createElement("span", { class: `value` }, `${risk.value}`);
  const uviRiskElement = createElement(
    "p",
    { class: `uvi__risk ${risk.class}` },
    riskLabel,
    riskValue
  );

  const uviElement = createElement(
    "div",
    { class: "uvi" },
    uviIndexElement,
    uviRiskElement
  );

  return uviElement;
}

export function createVisibilityElement(visibility) {
  const convertedDistance = utils.convertDistance(
    visibility,
    "meters",
    "miles"
  );

  const label = createElement("span", { class: "label" }, "visibility");

  const value = createElement(
    "span",
    { class: "value" },
    convertedDistance.value
  );

  const units = createElement(
    "span",
    { class: "units" },
    convertedDistance.units
  );

  const visibilityElement = createElement(
    "p",
    { class: "visibility" },
    label,
    value,
    units
  );

  return visibilityElement;
}

export function createWeatherDescriptionElement(description) {
  const weatherDiscriptionElement = createElement(
    "p",
    { class: "description description-text txt-center" },
    `${description}`
  );

  return weatherDiscriptionElement;
}

export function WeatherIcon(weather, size = "default") {
  const { icon, main, description } = weather;
  let sizeString = "";
  let imgDimensions = "50";

  if (size === "large") {
    sizeString = "@2x";
    imgDimensions = "100";
  }

  let imgSource = `https://openweathermap.org/img/wn/${icon}${sizeString}.png`;
  const titleText = `${main}: ${description}`;

  const weatherElement = createElement(
    "div",
    {
      class: "icon-container",
      title: titleText,
    },
    createElement("img", {
      class: "icon",
      src: imgSource,
      alt: titleText,
      width: imgDimensions,
      height: imgDimensions,
    })
  );

  return weatherElement;
}

export function createWeatherMainElement(main, description) {
  const div = document.createElement("div");
  const p = document.createElement("p");

  p.textContent = `${main}`;
  p.setAttribute("title", `${description}`);
  div.setAttribute("class", "main");

  div.appendChild(p);

  return div;
}

export function createWindElement(wind_deg, wind_gust, wind_speed) {
  const speedTextContent = `${utils.convertSpeed(wind_speed, "m/s", "mph")}`;
  let gustTextContent = "";
  if (wind_gust != undefined) {
    gustTextContent = `, gusts to ${utils.convertSpeed(
      wind_gust,
      "m/s",
      "mph"
    )}`;
  }
  const compass = createCompass(wind_deg);
  // addEventListener('resize', resizeCanvasContainer(compass));
  const textSpan = createElement("span", {}, gustTextContent);
  const text = createElement(
    "p",
    { class: "speed" },
    speedTextContent,
    textSpan
  );
  const windElement = createElement("div", { class: "wind" }, compass, text);
  const windElementObserver = new ResizeObserver(() => compass.resize());
  windElementObserver.observe(windElement);
  return windElement;
}

export { createDateTimeElement };
