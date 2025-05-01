
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

var player = new Image();

player.src = "player.png"; 

var x = 0;
var y = 0;

player.onload = function() {
    ctx.drawImage(player, x, y, 75, 75);

}
