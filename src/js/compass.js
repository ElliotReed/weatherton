export function createCompass(degrees, canvasSize = 50) {
  const fallbackText = `Your browser does not support HTML5 Canvas.`;

  const colorLight = "#FCF4F1";
  const colorDark = "#444444";
  const canvasTranslate = canvasSize / 2;
  const canvas = document.createElement("canvas");
  const compassRadius = canvasSize / 5;
  const ctx = canvas.getContext("2d");
  const shadowOffsetX = canvasSize / 25;
  const shadowOffsetY = canvasSize / 25;
  const shadowBlur = 4;
  const shadowColor = `${colorDark}66`;

  // canvas
  canvas.textContent = fallbackText;
  canvas.setAttribute("class", "compass");
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  // Canvas outline for development
  // ctx.strokeRect(0, 0, 100, 100);

  // default properties
  ctx.translate(canvasTranslate, canvasTranslate);
  ctx.strokeStyle = `${colorLight}cc`;
  ctx.fillStyle = `${colorLight}cc`;
  ctx.lineWidth = 1;

  function drawNESWMarkers() {
    const largeMarkerLineLength = compassRadius + compassRadius / 2.5;
    const numberOfMarkers = 4;

    ctx.save();
    for (let i = 0; i < numberOfMarkers; i++) {
      ctx.lineWidth = 2;
      ctx.rotate(Math.PI / (numberOfMarkers / 2));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(largeMarkerLineLength, 0);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }

  //"NE"
  function drawMiddleMarkers() {
    const meduimMarkerStart = compassRadius - compassRadius / 3;
    const meduimMarkerEnd = compassRadius + compassRadius / 3;
    const numberOfMarkers = 8;

    ctx.save();
    for (let i = 0; i < numberOfMarkers; i++) {
      if (i % 2 != 0) {
        ctx.beginPath();
        ctx.moveTo(meduimMarkerStart, 0);
        ctx.lineTo(meduimMarkerEnd, 0);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.rotate(Math.PI / (numberOfMarkers / 2));
    }
    ctx.restore();
  }
  // markers "S by SW"
  function drawBetweenMiddleMarkers() {
    const shortMarkerStart = compassRadius - compassRadius / 3;
    const shortMarkerEnd = compassRadius;
    const numberOfMarkers = 16;

    ctx.save();
    for (let i = 0; i < numberOfMarkers; i++) {
      if (i % 2 != 0) {
        ctx.beginPath();
        ctx.moveTo(shortMarkerStart, 0);
        ctx.lineTo(shortMarkerEnd, 0);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.rotate(Math.PI / (numberOfMarkers / 2));
    }
    ctx.restore();
  }

  function drawDirectionLabels() {
    const fontSize = compassRadius - compassRadius / 2;
    const NSPosition = compassRadius + compassRadius / 2;
    const EWPosition = compassRadius * 2 - compassRadius / 4;
    ctx.save();
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("N", 0, -NSPosition);
    ctx.textBaseline = "top";
    ctx.fillText("S", 0, NSPosition);
    ctx.textBaseline = "middle";
    ctx.fillText("E", EWPosition, 0);
    ctx.fillText("W", -EWPosition, 0);
    ctx.restore();
  }

  function drawCompassOutline() {
    const compassOutlineWidth = compassRadius / 4;
    ctx.save();
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.beginPath();
    ctx.lineWidth = compassOutlineWidth;
    ctx.arc(0, 0, compassRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = colorDark;
    ctx.stroke();
    ctx.restore();
  }

  function drawPointer() {
    const pointerWingX = compassRadius / 2;
    const pointerWingY = compassRadius / 2;
    const pointerVertexY = compassRadius / 4;
    const pointerFillColor = colorLight;
    const pointerStrokeColor = colorDark;
    ctx.save();
    // ctx.shadowOffsetX = shadowOffsetX;
    // ctx.shadowOffsetY = shadowOffsetY;
    // ctx.shadowBlur = shadowBlur;
    // ctx.shadowColor = shadowColor;
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, -pointerVertexY);
    ctx.lineTo(-pointerWingX, -pointerWingY);
    ctx.lineTo(0, compassRadius); // tip
    ctx.lineTo(pointerWingX, -pointerWingY);
    ctx.closePath();
    ctx.fillStyle = pointerFillColor;
    ctx.fill();
    ctx.strokeStyle = pointerStrokeColor;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  if (canvasSize > 50) {
    drawBetweenMiddleMarkers();
    drawMiddleMarkers();
    drawDirectionLabels();
    drawNESWMarkers();
  }
  drawCompassOutline();
  drawPointer();

  return canvas;
}
