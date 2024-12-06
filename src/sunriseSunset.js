export function createSunriseSunsetCanvas(weatherData, canvasSize = 100) {
  const fallbackText = `Your browser does not support HTML5 Canvas.`;
  const { sunrise, sunset, dt } = weatherData;
  // times
  const dtSunrise = new Date(sunrise * 1000);
  const sunriseHour = dtSunrise.getHours();
  const sunriseMinute = dtSunrise.getMinutes();
  const dtSunset = new Date(sunset * 1000);
  const sunsetHour = dtSunset.getHours();
  const sunsetMinute = dtSunset.getMinutes();
  // const dtCurrent = new Date(dt * 1000);
  const dtCurrent = new Date("March 1, 2021 7:00:00");
  const currentHour = dtCurrent.getHours();
  const currentMinute = dtCurrent.getMinutes();

  const colorLight = "#FCF4F1";
  const colorDark = "#444444";
  const colorSun = "#EC6E4C";
  const colorSunDark = "#703322";
  const canvas = document.createElement("canvas");
  const canvasWidth = canvasSize * 1.5;
  const canvasHeight = canvasSize;
  const radius = canvasHeight / 2.5;
  const sunPathlineWidth = radius / 18;
  const ctx = canvas.getContext("2d");
  let circleSize = canvasSize / 10;

  // canvas
  canvas.textContent = fallbackText;
  canvas.setAttribute("class", "sunrise-sunset__canvas");
  canvas.setAttribute("width", canvasWidth);
  canvas.setAttribute("height", canvasHeight);

  // Canvas outline for development
  // ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

  // default properties
  ctx.translate(canvasWidth / 2, canvasHeight * 0.66);
  ctx.strokeStyle = `${colorLight}66`;
  ctx.fillStyle = `${colorLight}cc`;
  ctx.lineWidth = 1;
  ctx.font = `${canvasSize * 0.15}px quicksand`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  // ctx.lineWidth = 4;

  function addShadowToCtx() {
    const shadowOffsetX = canvasSize / 60;
    const shadowOffsetY = canvasSize / 60;
    const shadowBlur = 5;
    const shadowColor = `${colorDark}66`;

    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
  }

  function convertTime(date) {
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
  function rotateToTime(hour, minute, forward = true) {
    const rotationOffset = 6;
    const rotationPerHour = (Math.PI * 2) / 24;
    const rotationPerMinute = rotationPerHour / 60;
    const rotationAmount =
      rotationPerHour * rotationOffset +
      rotationPerHour * hour +
      rotationPerMinute * minute;
    if (forward) {
      ctx.rotate(rotationAmount);
    } else {
      ctx.rotate(-rotationAmount);
    }
  }

  function drawCircleOnClock(semi = false, color = colorLight) {
    let circleStyle = Math.PI * 2;
    ctx.save();
    ctx.beginPath();
    if (semi) {
      circleStyle = Math.PI;
    }
    ctx.arc(0, 0, circleSize, 0, circleStyle, true);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function drawText(text) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = colorLight;
    ctx.fillText(text, 0, circleSize * 1.3);
    ctx.restore();
  }

  function drawSunPath() {
    const length = Math.PI;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = sunPathlineWidth;
    // ctx.moveTo(-radius, 0);
    rotateToTime(6, 0);
    ctx.ellipse(0, 0, radius, radius * 0.618, 0, 0, length);
    // ctx.arc(0, 0, radius, 0, length);
    // ctx.quadraticCurveTo(0, -radius, radius, 0);
    // ctx.lineTo(radius, 0);
    // ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function drawSun() {
    var a = radius;
    var b = radius * 0.618;
    var deltaX = radius * 0.32;

    var y1 = b * Math.sin(Math.acos(deltaX / a));

    let color = colorDark;
    if (dtCurrent > dtSunrise && dtCurrent < dtSunset) {
      color = colorSun;
    }
    ctx.save();
    rotateToTime(currentHour, currentMinute);
    // ctx.ellipse(0, 0, radius, radius / 2, 0, 0, 0);
    // ctx.translate(radius / 2, 0);
    ctx.translate(y1, 0);
    // ctx.translate(radius, 0);
    rotateToTime(currentHour, currentMinute, false);
    addShadowToCtx(color);
    drawCircleOnClock(false, color);
    ctx.restore();
  }

  function drawSunriseElement() {
    ctx.save();
    rotateToTime(6, 0);
    ctx.translate(radius, 0);
    rotateToTime(6, 0, false);
    ctx.save();
    addShadowToCtx(colorSun);
    drawCircleOnClock(true, colorSun);
    ctx.restore();
    drawText(`${convertTime(dtSunrise)}`);
    ctx.restore();
  }

  function drawSunsetElement() {
    ctx.save();
    rotateToTime(18, 0);
    ctx.translate(radius, 0);
    rotateToTime(18, 0, false);
    ctx.save();
    addShadowToCtx(colorSunDark);
    drawCircleOnClock(true, colorDark);
    ctx.restore();
    drawText(`${convertTime(dtSunset)}`);
    ctx.restore();
  }

  function draw() {
    ctx.save();
    drawSunPath();
    drawSun();
    drawSunriseElement();
    drawSunsetElement();
    ctx.restore();
  }

  draw();

  // =============================================
  function test() {
    ctx.save();
    rotateToTime(sunsetHour, sunsetMinute);
    ctx.translate(radius, 0);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 0);
    ctx.lineTo(50, 20);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.restore();
  }
  // test();
  return canvas;
}
