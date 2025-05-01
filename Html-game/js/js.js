const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const player = new Image();
player.src = "img/player.png";

const enemyImage = new Image();
enemyImage.src = "img/enemy.png";

const powerupImage = new Image();
powerupImage.src = "img/powerup.png";

let x = 100;
let y = 100;
const speed = 2;
const keys = {};
const maxHealth = 5;
let health = maxHealth;
let isDead = false;

let score = 0;
let hasPower = false;
let powerCharges = 0;
let gameStarted = false;
let showInstructions = false;

const obstacleCount = 5;
const obstacles = [];

function initObstacles() {
  obstacles.length = 0;
  for (let i = 0; i < obstacleCount; i++) {
    obstacles.push({
      x: Math.random() * (canvas.width - 96),
      y: Math.random() * (canvas.height - 96),
      width: 96,
      height: 96,
      speedX: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1),
      speedY: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1)
    });
  }
}

let powerup = {
  x: Math.random() * (canvas.width - 20),
  y: Math.random() * (canvas.height - 20),
  width: 32,
  height: 32
};

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  keys[key] = true;

  if (!gameStarted && key === "1") {
    gameStarted = true;
    isDead = false;
    health = maxHealth;
    score = 0;
    hasPower = false;
    powerCharges = 0;
    x = 100;
    y = 100;
    initObstacles();
  } else if (!gameStarted && key === "2") {
    showInstructions = true;
  } else if (!gameStarted && key === "escape") {
    showInstructions = false;
  } else if (isDead && key === "r") {
    health = maxHealth;
    isDead = false;
    x = 100;
    y = 100;
    score = 0;
    hasPower = false;
    powerCharges = 0;
    initObstacles();
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

  if (!gameStarted) {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "48px Arial";
    ctx.fillText("🎮 Welcome to the Game", canvas.width / 2, canvas.height / 2 - 100);
    ctx.font = "24px Arial";
    ctx.fillText("1 - Start Game", canvas.width / 2, canvas.height / 2);
    ctx.fillText("2 - How to Play", canvas.width / 2, canvas.height / 2 + 40);

    if (showInstructions) {
      ctx.fillText("Use W A S D to move", canvas.width / 2, canvas.height / 2 + 100);
      ctx.fillText("Avoid enemies unless you have a powerup", canvas.width / 2, canvas.height / 2 + 140);
      ctx.fillText("Collect powerups to defeat enemies (3 charges)", canvas.width / 2, canvas.height / 2 + 180);
      ctx.fillText("Press R after death to restart", canvas.width / 2, canvas.height / 2 + 220);
      ctx.fillText("Press ESC to go back", canvas.width / 2, canvas.height / 2 + 260);
    }
    ctx.textAlign = "start";
    requestAnimationFrame(gameLoop);
    return;
  }

  ctx.fillStyle = "#89c79c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!isDead) {
    if (keys["w"]) y -= speed;
    if (keys["s"]) y += speed;
    if (keys["a"]) x -= speed;
    if (keys["d"]) x += speed;

    x = Math.max(0, Math.min(x, canvas.width - 96));
    y = Math.max(0, Math.min(y, canvas.height - 96));
  }

  if (!hasPower) {
    if (powerupImage.complete) {
      ctx.drawImage(powerupImage, powerup.x, powerup.y, powerup.width, powerup.height);
    }
  }

  if (!hasPower && checkCollision({ x, y, width: 96, height: 96 }, powerup)) {
    hasPower = true;
    powerCharges = 3;
  }

  for (let i = 0; i < obstacles.length; i++) {
    const obs = obstacles[i];

    if (!isDead) {
      obs.x += obs.speedX;
      obs.y += obs.speedY;

      if (obs.x < 0 || obs.x + obs.width > canvas.width) obs.speedX *= -1;
      if (obs.y < 0 || obs.y + obs.height > canvas.height) obs.speedY *= -1;
    }

    if (enemyImage.complete) {
      ctx.drawImage(enemyImage, obs.x, obs.y, obs.width, obs.height);
    }

    if (!isDead && checkCollision({ x, y, width: 96, height: 96 }, obs)) {
      if (hasPower) {
        obstacles.splice(i, 1);
        score++;
        powerCharges--;

        obstacles.push({
          x: Math.random() * (canvas.width - 96),
          y: Math.random() * (canvas.height - 96),
          width: 96,
          height: 96,
          speedX: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1),
          speedY: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1)
        });

        if (powerCharges <= 0) {
          hasPower = false;
        }

        powerup.x = Math.random() * (canvas.width - 20);
        powerup.y = Math.random() * (canvas.height - 20);
        break;
      } else {
        health--;
        obs.x = Math.random() * (canvas.width - 96);
        obs.y = Math.random() * (canvas.height - 96);
        if (health <= 0) {
          isDead = true;
        }
      }
    }
  }

  if (!isDead && player.complete) {
    ctx.drawImage(player, x, y, 96, 96);
  }

  ctx.fillStyle = "black";
  ctx.fillRect(20, 20, 200, 20);
  ctx.fillStyle = "limegreen";
  ctx.fillRect(20, 20, (health / maxHealth) * 200, 20);
  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText(`Health: ${health}/${maxHealth}`, 25, 35);

  ctx.font = "16px Arial";
  ctx.fillText(`Score: ${score}`, 20, 60);

  if (hasPower) {
    ctx.fillText(`Power Charges: ${powerCharges}`, 20, 80);
  }

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
