export function convertTime(time) {
  const date = new Date(time * 1000);
  const minutes = date.getMinutes().toString().padStart(2, "0");
  let convertedTime;
  let meridiem = `AM`;
  let hours = date.getHours();

  if (hours >= 12) {
    meridiem = `PM`;
  }

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  convertedTime = `${hours}:${minutes} ${meridiem}`;

  return convertedTime;
}

export function convertTemperature(temperature, fromScale, toScale) {
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

export function convertSpeed(speed, fromScale = "m/s", toScale = "mph") {
  if ((fromScale = "m/s") && (toScale = "mph")) {
    const mphSpeed = Math.floor(speed * 2.237);
    return `${mphSpeed} mph`;
  }
  return `${speed} m/s`;
}

export function convertDistance(distance, fromScale, toScale) {
  const oDistance = {
    value: distance,
    units: fromScale,
  };
  if ((fromScale = "meters") && (toScale = "miles")) {
    oDistance.value = (distance * 0.000621371).toFixed(2);
    oDistance.units = toScale;
  }
  return oDistance;
}

export function convertToPercent(number) {
  return (number * 100).toFixed(0);
}
export function convertVolume(volume, fromScale, toScale) {
  const oVolume = {
    value: volume,
    units: "mm",
  };
  if ((fromScale = "mm") && (toScale = "inches")) {
    oVolume.value = (volume * 0.0393701).toFixed(2);
    oVolume.units = toScale;
  }
  return oVolume;
}

export function getDayOrNight(isNow, weatherData) {
  const { dt, sunrise, sunset } = weatherData;
  let dayOrNight = "night";

  const now = new Date();
  const time = new Date(dt * 1000);
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);

  if (!isNow) {
    const hour = time.getHours();
    if (hour >= 8 && hour <= 20) {
      dayOrNight = "day";
    }
  } else if (now > sunriseDate && now < sunsetDate) {
    dayOrNight = "day";
  }

  return dayOrNight;
}

export function getUviRisk(uvi) {
  let risk = {
    value: "",
    class: "",
  };

  if (uvi < 3) {
    risk.value = "low";
    risk.class = "low";
  }
  if (uvi >= 3 && uvi < 6) {
    risk.value = "moderate";
    risk.class = "moderate";
  }
  if (uvi >= 6 && uvi < 8) {
    risk.value = "high";
    risk.class = "high";
  }
  if (uvi >= 8 && uvi < 11) {
    risk.value = "very high";
    risk.class = "very-high";
  }
  if (uvi >= 11) {
    risk.value = "extreme";
    risk.class = "extreme";
  }
  return risk;
}
