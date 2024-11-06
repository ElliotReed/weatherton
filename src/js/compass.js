export function createCompass(degrees) {
  const fallbackText = `Your browser does not support HTML5 Canvas.`;
  const colorLight = "#FCF4F1";
  const colorDark = "#444444";
  const shadowBlur = 4;
  const shadowColor = `${colorDark}66`;

  let canvas;
  let ctx;
  let compassRadius;
  let shadowOffsetX;
  let shadowOffsetY;

  function initializeCanvas() {
    canvas = document.createElement("canvas");
    canvas.textContent = fallbackText;
    canvas.setAttribute("class", "compass");
    ctx = canvas.getContext("2d");
  }

  function assignVariables(canvasSize) {
    compassRadius = canvasSize / 5;
    shadowOffsetX = canvasSize / 25;
    shadowOffsetY = canvasSize / 25;
  }

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

  function draw() {
    ctx.strokeStyle = `${colorLight}cc`;
    ctx.fillStyle = `${colorLight}cc`;
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Canvas outline for development, uncomment next line to see outline
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (canvas.width > 60) {
      drawBetweenMiddleMarkers();
      drawMiddleMarkers();
      drawDirectionLabels();
      drawNESWMarkers();
    }

    drawCompassOutline();
    drawPointer();
  }

  function resizeCanvas() {
    const container = canvas.parentElement;
    if (!container) return;

    // Set canvas size to match the container
    canvas.width = container.offsetHeight;
    canvas.height = container.offsetHeight;

    assignVariables(canvas.width);
    draw();
  }

  initializeCanvas();
  resizeCanvas();

  canvas.resize = resizeCanvas;

  return canvas;
}
