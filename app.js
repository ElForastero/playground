// 💩

const scene = document.querySelector('#scene');
scene.width = window.innerWidth;
scene.height = window.innerHeight;

const c = scene.getContext('2d');
const colors = ['#333541', '#15AFC0', '#4D8B8C', '#EC6037'];
let circles = [];
let mouse = {x: null, y: null};

const generateCircles = () => {
  circles = [];

  for (let i = 0; i < 1000; i++) {
    const size = Math.random() * 19 + 1;
    const x = Math.random() * (window.innerWidth - size * 2) + size;
    const y = Math.random() * (window.innerHeight - size * 2) + size;
    const xSpeed = (Math.random() - 0.5) * 2;
    const ySpeed = (Math.random() - 0.5) * 2;
    const color = colors[Math.round(Math.random() * (colors.length - 1))];

    circles.push({x, y, size, initialSize: size, xSpeed, ySpeed, color});
  }
}

const move = ({x, y, size, color}) => {
  c.beginPath();
  c.arc(x, y, size, 0, Math.PI * 2, false);
  c.strokeStyle = color;
  c.fillStyle = color;
  c.stroke();
  c.fill();
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.globalAlpha = 0.9;

  circles = circles.map(circle => {
    move(circle);
    let {x, y, ySpeed, xSpeed, size, initialSize, color} = circle;

    if (mouse.x !== null && mouse.x - 100 < x && mouse.x + 100 > x &&
        mouse.y !== null && mouse.y - 100 < y && mouse.y + 100 > y) {
      if (size < 50) {
        size++;
      }
    } else if (size > initialSize) {
      size--;
    }

    if (x + size >= innerWidth || x - size <= 0) {
      xSpeed *= -1;
    }

    if (y + size > innerHeight || y - size <= 0) {
      ySpeed *= -1;
    }

    x += xSpeed;
    y += ySpeed;
    return {size, xSpeed, ySpeed, x, y, color, initialSize};
  });
};

generateCircles();
animate();

window.addEventListener('mousemove', event => {
  mouse = {x: event.offsetX, y: event.offsetY};
});

window.addEventListener('resize', () => {
  scene.width = innerWidth;
  scene.height = innerHeight;
  generateCircles();
});

