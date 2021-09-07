let pTroops = [];
let eTroops = [];

function drawTroops() {
  for (i = 0; i < pTroops.length; i++) {
    pTroops[i].update();
  }
  for (i = 0; i < eTroops.length; i++) {
    eTroops[i].update();
  }
}

function identityOutline(troop) {
  c.lineWidth = 3;
  if (troop.playerTroop) c.strokeStyle = "blue";
  else c.strokeStyle = "red";
}
function resetStroke() {
  c.lineWidth = 1;
  c.strokeStyle = "black";
}

class Swordsman {
  constructor(x, y, playerTroop) {
    this.x = x;
    this.y = y;
    this.playerTroop = playerTroop;

    this.health = 12;
    this.damage = 3;
    this.speed = 2;
    this.attackSpeed = 1000; //Every 1000 miliseconds
    this.lastAttack = 0;
    this.sightRadius = 6; //Not sure yet
  }

  draw() {
    identityOutline(this);

    c.fillStyle = "yellow";
    c.beginPath();
    c.arc(this.x, this.y, /*radius*/ nbTiles / 4, 0, Math.PI * 2);
    c.stroke();
    c.fill();

    resetStroke();
  }

  update() {
    if (this.playerTroop) {
      this.x += this.speed;
    }

    this.draw();
  }
}

pTroops.push(new Swordsman(nbTiles / 2, nbTiles / 2, true));

//hola
//TEst
//Hola
// branch 2
