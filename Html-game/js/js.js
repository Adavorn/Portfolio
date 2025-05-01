const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const player = new Image();
player.src = "img/player.png"; 


let x = 100;
let y = 100;
const speed = 2;
const keys = {};
const maxHealth = 5;
let health = maxHealth;
let isDead = false;


let score = 0;
let hasPower = false;


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


let powerup = {
  x: Math.random() * (canvas.width - 20),
  y: Math.random() * (canvas.height - 20),
  width: 20,
  height: 20,
  color: "gold"
};


document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  keys[key] = true;

  if (isDead && key === "r") {
    health = maxHealth;
    isDead = false;
    x = 100;
    y = 100;
    score = 0;
    hasPower = false;
  
    obstacles.length = 0;
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


  if (!hasPower) {
    ctx.fillStyle = powerup.color;
    ctx.beginPath();
    ctx.arc(powerup.x + 10, powerup.y + 10, 10, 0, Math.PI * 2);
    ctx.fill();
  }


  if (!hasPower && checkCollision({ x, y, width: 64, height: 64 }, powerup)) {
    hasPower = true;
    console.log("⚡ Power acquired!");
  }


  ctx.fillStyle = "red";
  for (let i = 0; i < obstacles.length; i++) {
    const obs = obstacles[i];

    if (!isDead) {
      obs.x += obs.speedX;
      obs.y += obs.speedY;

      if (obs.x < 0 || obs.x + obs.width > canvas.width) obs.speedX *= -1;
      if (obs.y < 0 || obs.y + obs.height > canvas.height) obs.speedY *= -1;
    }

    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);


    if (!isDead && checkCollision({ x, y, width: 64, height: 64 }, obs)) {
      if (hasPower) {

        obstacles.splice(i, 1);
        score++;
        hasPower = false;


        powerup.x = Math.random() * (canvas.width - 20);
        powerup.y = Math.random() * (canvas.height - 20);
        break;
      } else {
        health--;
        console.log(`💥 HIT! Health: ${health}`);
        obs.x = Math.random() * (canvas.width - 50);
        obs.y = Math.random() * (canvas.height - 50);
        if (health <= 0) {
          isDead = true;
        }
      }
    }
  }


  if (!isDead && player.complete) {
    ctx.drawImage(player, x, y, 64, 64);
  }


  ctx.fillStyle = "black";
  ctx.fillRect(20, 20, 200, 20);
  ctx.fillStyle = "limegreen";
  ctx.fillRect(20, 20, (health / maxHealth) * 200, 20);
  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText(`Health: ${health}/${maxHealth}`, 25, 35);


  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`Score: ${score}`, 20, 60);


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