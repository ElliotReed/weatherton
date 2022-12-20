export function drawBarometer(pressure, canvasSize = 50) {
  const barometerColor = "#fcfcfc";
  const barometerEmptyColor = "#ececec";
  const barometerHeight = (canvasSize / 10) * 5.5;
  const barometerWidth = canvasSize / 10;
  const barometerX = (canvasSize * 2) / 3;
  const barometerY = canvasSize / 5;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const fallbackText = `Your browser does not support HTML5 canvas`;
  const font = `Arial`;
  const mercuryColor = "#441414";
  const percentPressure = (pressure - 950) * 0.01;

  // canvas
  canvas.textContent = fallbackText;
  canvas.setAttribute("class", "barometer");
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  // default properties
  ctx.strokeStyle = barometerColor;
  ctx.fillStyle = barometerColor;
  ctx.textAlign = "center";
  ctx.baseline = "bottom";

  // Canvas outline for development
  // ctx.strokeRect(0, 0, canvasSize, canvasSize);

  function getPressureY() {
    return (
      barometerY + barometerHeight + barometerHeight * percentPressure * -1
    );
  }

  function drawBarometer() {
    const parts = ["body", "hole"];
    const shadowOffsetX = barometerWidth / 3;
    const shadowOffsetY = barometerWidth / 3;
    const shadowBlur = 4;
    const shadowColor = "#22222266";

    function drawBarometerTop() {
      for (let i = 0; i < parts.length; i++) {
        ctx.save();
        let radius = barometerWidth / 2;

        if (parts[i] === "body") {
          ctx.shadowOffsetX = shadowOffsetX;
          ctx.shadowOffsetY = shadowOffsetY;
          ctx.shadowBlur = shadowBlur;
          ctx.shadowColor = shadowColor; //or use rgb(red, green, blue)
        }

        if (parts[i] === "hole") {
          ctx.fillStyle = barometerEmptyColor;
          radius = radius * 0.618;
        }

        ctx.beginPath();
        ctx.arc(
          barometerX + barometerWidth / 2,
          barometerY,
          radius,
          0,
          Math.PI,
          true
        );
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }
    function drawBarometerBottom() {
      let radius = barometerWidth / 1.38;
      const circleY = barometerY + barometerHeight + radius / 1.5;
      for (let i = 0; i < parts.length; i++) {
        ctx.save();

        if (parts[i] === "body") {
          ctx.shadowOffsetX = shadowOffsetX;
          ctx.shadowOffsetY = shadowOffsetY;
          ctx.shadowBlur = shadowBlur;
          ctx.shadowColor = shadowColor; //or use rgb(red, green, blue)
        }

        if (parts[i] === "hole") {
          ctx.fillStyle = mercuryColor;
          radius = radius * 0.618;
        }
        ctx.beginPath();
        ctx.arc(
          barometerX + barometerWidth / 2,
          circleY,
          radius,
          0,
          Math.PI * 2,
          true
        );
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }

    function drawBarometerBody() {
      for (let i = 0; i < parts.length; i++) {
        let rectX = barometerX;
        let rectY = barometerY;
        let rectWidth = barometerWidth;
        let rectHeight = barometerHeight;

        ctx.save();
        if (parts[i] === "body") {
          ctx.shadowOffsetX = shadowOffsetX;
          ctx.shadowOffsetY = shadowOffsetY;
          ctx.shadowBlur = shadowBlur;
          ctx.shadowColor = shadowColor; //or use rgb(red, green, blue)
        }

        if (parts[i] === "hole") {
          ctx.fillStyle = barometerEmptyColor;
          rectWidth = barometerWidth / 2;
          rectX = barometerX + barometerWidth / 4;
        }
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        ctx.restore();
      }
    }

    function drawMercuryFill() {
      ctx.save();
      ctx.fillStyle = mercuryColor;
      ctx.fillRect(
        barometerX + barometerWidth / 3,
        barometerY + barometerHeight,
        barometerWidth / 4,
        barometerHeight * percentPressure * -1
      );
      ctx.restore();
    }

    drawBarometerTop();
    drawBarometerBottom();
    drawBarometerBody();
    drawMercuryFill();
  }

  function drawMarker() {
    const markerLength = barometerWidth;
    const yValue = getPressureY();
    const markerStartValue = barometerX - markerLength / 2;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(markerStartValue, yValue);
    ctx.lineTo(markerStartValue - markerLength, yValue);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  function drawLabel() {
    const pressureTextFontSize = 14;
    const pressureTextFontSizeSmall = 12;
    const verticleTextFontSizeSmall = 12;
    const pressureX = canvasSize / 3;
    const unitsX = pressureX;
    const pressureY = getPressureY();
    const unitsY = pressureY + pressureTextFontSize;
    let pressureText = `${pressure}`;
    var unitsText = `mbar`;
    ctx.save();
    ctx.textBaseline = "middle";
    if (canvasSize > 50) {
      ctx.font = `${pressureTextFontSizeSmall}px ${font}`;
      ctx.fillText(pressureText, pressureX, pressureY);
      ctx.font = `${pressureTextFontSizeSmall}px ${font}`;
      ctx.fillText(unitsText, unitsX, unitsY);
    } else {
      ctx.translate(canvasSize / 2, canvasSize / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.font = `${verticleTextFontSizeSmall}px ${font}`;
      ctx.fillText(pressureText, 0, -pressureTextFontSize / 2);
    }
    ctx.restore();
  }

  drawBarometer();
  drawMarker();
  drawLabel();
  return canvas;
}
