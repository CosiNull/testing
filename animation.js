function draw(){
    requestAnimationFrame(draw);
    c.clearRect(0,0,canvas.width,canvas.height);
    drawTiles();
    drawTroops();
}
draw();