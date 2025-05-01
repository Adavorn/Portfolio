const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const player = new Image();
player.src = "img/player.png";


let x = 100;
let y = 100;
const speed = 2;
const keys = {};
let health = 3;
let isDead = false;


const obstacleCount = 5;
const obstacles = [];

for (let i = 0; i < obstacleCount; i++) {
  obstacles.push({
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * (canvas.height - 50),
    width: 50,
    height: 50,
    speedX: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1),
    speedY: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1)
  });
}


document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  keys[key] = true;

  if (isDead && key === "r") {

    health = 5;
    isDead = false;
    x = 100;
    y = 100;
  }
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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#89c79c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!isDead) {
  
    if (keys["w"]) y -= speed;
    if (keys["s"]) y += speed;
    if (keys["a"]) x -= speed;
    if (keys["d"]) x += speed;


    x = Math.max(0, Math.min(x, canvas.width - 64));
    y = Math.max(0, Math.min(y, canvas.height - 64));
  }


  ctx.fillStyle = "red";
  for (let obs of obstacles) {
    if (!isDead) {
      obs.x += obs.speedX;
      obs.y += obs.speedY;


      if (obs.x < 0 || obs.x + obs.width > canvas.width) obs.speedX *= -1;
      if (obs.y < 0 || obs.y + obs.height > canvas.height) obs.speedY *= -1;
    }

    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

    if (!isDead && checkCollision({ x, y, width: 64, height: 64 }, obs)) {
      health--;
      console.log(`💥 COLLISION! Health: ${health}`);
      obs.x = Math.random() * (canvas.width - 50);
      obs.y = Math.random() * (canvas.height - 50);
      if (health <= 0) {
        isDead = true;
      }
    }
  }


  if (!isDead && player.complete) {
    ctx.drawImage(player, x, y, 64, 64);
  }


  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Health: ${health}`, 20, 30);


  if (isDead) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "48px Arial";
    ctx.fillText("💀 Game Over", canvas.width / 2, canvas.height / 2);
    ctx.font = "24px Arial";
    ctx.fillText("Press 'R' to Restart", canvas.width / 2, canvas.height / 2 + 40);
    ctx.textAlign = "start";
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
