const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const player = new Image();
player.src = "img/player.png"; 


let x = 100;
let y = 100;
const speed = 2;
const keys = {};


const obstacleCount = 4;
const obstacles = [];

for (let i = 0; i < obstacleCount; i++) {
  obstacles.push({
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * (canvas.height - 50),
    width: 35,
    height: 35,
    speedX: (Math.random() * 1.0 + 0.5) * (Math.random() < 0.5 ? 1 : -1),
    speedY: (Math.random() * 1.0 + 0.5) * (Math.random() < 0.5 ? 1 : -1)
  });
}


document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});


function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}


function gameLoop() {

  if (keys["w"]) y -= speed;
  if (keys["s"]) y += speed;
  if (keys["a"]) x -= speed;
  if (keys["d"]) x += speed;


  x = Math.max(0, Math.min(x, canvas.width - 64));
  y = Math.max(0, Math.min(y, canvas.height - 64));


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#89c79c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  for (let obs of obstacles) {
    obs.x += obs.speedX;
    obs.y += obs.speedY;


    if (obs.x < 0 || obs.x + obs.width > canvas.width) obs.speedX *= -1;
    if (obs.y < 0 || obs.y + obs.height > canvas.height) obs.speedY *= -1;

    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);


    if (checkCollision({ x, y, width: 64, height: 64 }, obs)) {
      console.log("💥 COLLISION! Dodge better!");
    }
  }


  if (player.complete) {
    ctx.drawImage(player, x, y, 64, 64);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
