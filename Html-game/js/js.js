
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

var player = new Image();

player.src = "player.png"; 

var x = 0;
var y = 0;
var key = 0;

player.onload = function() {
    ctx.drawImage(player, x, y, 75, 75);
}

document.onkeydown = function(e) {
    key = e.key;
}


setInterval(function() {

    if (key == "w") {
        y -= 1;
    }
    if (key == "a") {
        x -= 1;
    }
    if (key == "s") {
        y += 1;
    }
    if (key == "d") {
        x += 1;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(player, x, y, 75, 75);

}, 5);