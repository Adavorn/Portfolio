const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const player = new Image();
player.src = "img/player.png"; 


let x = 100;
let y = 100;
const speed = 2;
const keys = {};


let obstacle = {
  x: 400,
  y: 200,
  width: 50,
  height: 50,
  speedX: 3,
  speedY: 0
};


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


  obstacle.x += obstacle.speedX;
  obstacle.y += obstacle.speedY;

  if (obstacle.x + obstacle.width > canvas.width || obstacle.x < 0) {
    obstacle.speedX *= -1;
  }

  if (obstacle.y + obstacle.height > canvas.height || obstacle.y < 0) {
    obstacle.speedY *= -1;
  }


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#89c79c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  ctx.fillStyle = "red";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

  if (player.complete) {
    ctx.drawImage(player, x, y, 64, 64);
  }


  let playerBox = { x, y, width: 64, height: 64 };
  if (checkCollision(playerBox, obstacle)) {
    console.log("💥 COLLISION! Dodge better!");
  }

  requestAnimationFrame(gameLoop);
}

gameLoop()