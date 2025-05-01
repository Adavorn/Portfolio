const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const player = new Image();
player.src = "img/player.png"; 


let x = 100;
let y = 100;
const speed = 1;


const keys = {};


document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});


function gameLoop() {
 
  if (keys["w"]) y -= speed;
  if (keys["s"]) y += speed;
  if (keys["a"]) x -= speed;
  if (keys["d"]) x += speed;

  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#89c79c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  if (player.complete) {
    ctx.drawImage(player, x, y, 64, 64);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();