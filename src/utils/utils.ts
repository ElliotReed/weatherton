type TemperatureScale = "Kelvin" | "Fahrenheit" | "Celsius";
type SpeedScale = "m/s" | "mph";
type VisibilityScale = "meters" | "miles";
type VolumeScale = "mm" | "inches";

export const roundToTwo = (value: number) => parseFloat(value.toFixed(2));

export function convertTime(time: number) {
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

export function convertTemperature(
    temperature: number,
    fromScale: TemperatureScale,
    toScale: TemperatureScale): String {
    if (fromScale === toScale) return String(temperature);
    switch (fromScale) {
        case "Kelvin":
            if (toScale === "Fahrenheit") {
                return ((temperature * 9) / 5 - 459.67).toFixed(0);
            } else if (toScale === "Celsius") {
                return (temperature - 273.15).toFixed(0);
            }
        case "Celsius":
            if (toScale === "Fahrenheit") {
                return ((temperature * 9) / 5 + 32).toFixed(0);
            } else if (toScale === "Kelvin") {
                return (temperature + 273.15).toFixed(0);
            }
        case "Fahrenheit":
            if (toScale === "Kelvin") {
                return (((temperature + 459.67) * 9) / 5).toFixed(0);
            } else if (toScale === "Celsius") {
                return (((temperature - 32) * 9) / 5).toFixed(0);
            }
        default:
            return String(temperature);
    }
}

export function convertSpeed(
    speed: number,
    fromScale: SpeedScale = "m/s",
    toScale: SpeedScale = "mph") {
    if ((fromScale = "m/s") && (toScale = "mph")) {
        const mphSpeed = Math.floor(speed * 2.237);
        return `${mphSpeed} mph`;
    }
    return `${speed} m/s`;
}

export function convertDistance(
    distance: number,
    fromScale: VisibilityScale,
    toScale: VisibilityScale) {
    const oDistance = {
        value: String(distance),
        units: fromScale,
    };
    if ((fromScale = "meters") && (toScale = "miles")) {
        oDistance.value = (distance * 0.000621371).toFixed(2);
        oDistance.units = toScale;
    }
    return oDistance;
}

export function convertToPercent(number: number) {
    return (number * 100).toFixed(0);
}

type VolumeReturn = {
    value: string,
    units: string
}

export function convertVolume(
    volume: number,
    fromScale: VolumeScale,
    toScale: VolumeScale
): VolumeReturn {
    const oVolume = {
        value: String(volume),
        units: "mm",
    };
    if ((fromScale = "mm") && (toScale = "inches")) {
        oVolume.value = (volume * 0.0393701).toFixed(2);
        oVolume.units = toScale;
    }
    return oVolume;
}

// export function getDayOrNight(isNow: boolean, weatherData: unknown) {
//     const { dt, sunrise, sunset } = weatherData;
//     let dayOrNight: "day" | "night" = "night";

//     const now = new Date();
//     const time = new Date(dt * 1000);
//     const sunriseDate = new Date(sunrise * 1000);
//     const sunsetDate = new Date(sunset * 1000);

//     if (!isNow) {
//         const hour = time.getHours();
//         if (hour >= 8 && hour <= 20) {
//             dayOrNight = "day";
//         }
//     } else if (now > sunriseDate && now < sunsetDate) {
//         dayOrNight = "day";
//     }

//     return dayOrNight;
// }

export function getUviRisk(uvi: number) {
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
