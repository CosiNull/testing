let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let nbTiles = canvas.height/18;
function drawTiles(){
    c.fillStyle = "green"
    c.fillRect(0,0,canvas.width,canvas.height)

    for( i=0; i<canvas.height; i+=nbTiles){
        c.beginPath();
        c.moveTo(0,i);
        c.lineTo(canvas.width,i);
        c.stroke();
    }
    for( i=0; i<canvas.width; i+=nbTiles){
        c.beginPath();
        c.moveTo(i,0);
        c.lineTo(i,canvas.width);
        c.stroke();
    }
}

