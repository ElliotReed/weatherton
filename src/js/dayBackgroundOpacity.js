/*
exports getDayBackgroundOpacity()
sets the overlay opacity for different
times during the 24 hour cycle
 */

// TODO: add extra offset for clouds, rain

// enables chainging inver function
const converter = {
  result: null,
  convertToOpacity(minutes) {
    this.result = (minutes / 60).toFixed(2);
    return this;
  },
  invert() {
    this.result = 1 - this.result
    return this;
  },
}

function getMinutesFromDate(date) {
  return date.getMinutes();
}

function getOffset(minutes) {
  const minutesInHour = 60;
  return minutesInHour - minutes;
}

function getOffsetTotal(baseMinutes, currentMinutes) {
  const baseOffset = getOffset(baseMinutes);
  const currentOffset = getOffset(currentMinutes);
  const totalOffset = baseOffset - currentOffset;
  return totalOffset;
}

function subtractHoursFromDate(originDate, hours) {
  const date = new Date(originDate);
  date.setHours(date.getHours() - hours);
  return date;
}

function isRising(currentDate, sunriseDate) {
  const preSunriseDate = subtractHoursFromDate(sunriseDate, 1);
  return currentDate > preSunriseDate && currentDate < sunriseDate;
}

function isSetting(currentDate, sunsetDate) {
  const preSunsetDate = subtractHoursFromDate(sunsetDate, 1);
  return currentDate > preSunsetDate && currentDate < sunsetDate;
}

function isDaytime(currentDate, sunriseDate, sunsetDate) {
  const preSunsetDate = subtractHoursFromDate(sunsetDate, 1);
  return currentDate > sunriseDate && currentDate < preSunsetDate;
}

function getCorrectedOpacity(totalOffset, invert) {
  if (invert) {
    return converter.convertToOpacity(totalOffset).invert().result;
  }
  return converter.convertToOpacity(totalOffset).result;
}

function getOpacity(baseDate, currentDate, invert = false) {
  const baseMinutes = getMinutesFromDate(baseDate);
  const currentMinutes = getMinutesFromDate(currentDate);
  // default currentMinutes < baseMinutes
  let totalOffset = currentMinutes + getOffset(baseMinutes);

  if (currentMinutes > baseMinutes) {
    totalOffset = getOffsetTotal(baseMinutes, currentMinutes);
  }

  return getCorrectedOpacity(totalOffset, invert)
}

function unixDate(milliseconds) {
  return new Date(milliseconds * 1000);
}

export function getDayBackgroundOpacity(weatherData) {
  const { dt, sunrise, sunset } = weatherData;
  const currentDate = unixDate(dt);
  const sunriseDate = unixDate(sunrise);
  const sunsetDate = unixDate(sunset);

  // default for night
  let opacity = 0;

  // TODO: add test
  // set for development
  // currentDate.setHours(15);
  // currentDate.setMinutes(50);

  if (isDaytime(currentDate, sunriseDate, sunsetDate)) {
    opacity = 1;
  }

  if (isRising(currentDate, sunriseDate)) {
    opacity = getOpacity(sunriseDate, currentDate);
  }

  if (isSetting(currentDate, sunsetDate)) {
    opacity = getOpacity(sunsetDate, currentDate, true);
  }

  return opacity;
}

/*
  Changes the weather and forecast data into standard values for getDayBackgoundOpacity
*/
export function getForecastOpacityOptions(forecastData, weatherData) {
  const forecastDate = unixDate(forecastData.dt);
  const sunriseDate = unixDate(weatherData.current.sunrise);
  const sunsetDate = unixDate(weatherData.current.sunset)

  // increases sunrise and sunset unitl matched to current date dt
  while (sunriseDate.getDate() < forecastDate.getDate()) {
    sunriseDate.setDate(sunriseDate.getDate() + 1);
    sunsetDate.setDate(sunsetDate.getDate() + 1);
  }

  // convert dates back to UTC
  const opacityOptions = {
    dt: forecastDate.getTime() / 1000,
    sunrise: sunriseDate.getTime() / 1000,
    sunset: sunsetDate.getTime() / 1000,
  }

  return opacityOptions
}