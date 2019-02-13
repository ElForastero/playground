const scene = document.getElementById("scene");
const width = (scene.width = window.innerWidth);
const height = (scene.height = window.innerHeight);
const c = scene.getContext("2d");

let offset = 0;
let colors = [255, 255, 255];

function drawSinusoid() {
  c.fillRect(0, 0, width, height);
  c.lineWidth = 10;

  const [r, g, b] = colors;
  c.strokeStyle = `rgb(${r}, ${g}, ${b})`;

  c.beginPath();

  for (let angle = 0; angle < Math.PI * 2; angle += 1) {
    const x = angle * 200;
    const y = height / 2 + Math.sin(angle + offset) * 200 * -1;
    c.lineTo(x, y);
  }

  c.stroke();

  offset += 0.05;

  requestAnimationFrame(drawSinusoid);
}

requestAnimationFrame(drawSinusoid);
