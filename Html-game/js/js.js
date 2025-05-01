const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load sprite
const player = new Image();
player.src = "img/player.png"; 

// Player position & speed
let x = 100;
let y = 100;
const speed = 2;

// Keys being held
const keys = {};

// Movement handler
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// Game loop
function gameLoop() {
  // Update position
  if (keys["w"]) y -= speed;
  if (keys["s"]) y += speed;
  if (keys["a"]) x -= speed;
  if (keys["d"]) x += speed;

  // Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.fillStyle = "#89c79c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player (only if image is loaded)
  if (player.complete) {
    ctx.drawImage(player, x, y, 64, 64);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();