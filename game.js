//0 Useful functions
function sleep(milliseconds){
    let start = new Date().getTime();
    for (var i = 0; i == i; i++){
        if ((new Date().getTime()-start) > milliseconds){
            break;
        }
    }
}

//1 Ready to use canvas
let playground = document.querySelector("canvas")
playground.width = 1350;
playground.height = 100;
c = playground.getContext("2d");

//2 Resizable canvas (map)
let map = [];
let sideLength = 50;
let wallHeight = sideLength*5/9;

function resizeMap(width,height,eraseOldMap){
    //2.1 size
    playground.width = sideLength*(width+1);
    playground.height = (sideLength*(height+1))+wallHeight;
    //2.2 drawWall
    c.fillRect(0,0,playground.width,wallHeight)
    //2.3 drawGrid
    for(i=0;i<=height;i++){
        c.beginPath();
        c.moveTo(0,i*sideLength+wallHeight);
        c.lineTo(playground.width,i*sideLength+wallHeight);
        c.stroke();
    }
    for(i=0;i<=width;i++){
        c.beginPath();
        c.moveTo(i*sideLength,0);
        c.lineTo(i*sideLength,playground.height);
        c.stroke();
    }
    //2.4 Create map array
    if(eraseOldMap){
        map = [];
        let tempArr = [];
        for(i=0;i<=height;i++){
            for(j=0;j<width;j++){
                tempArr.push("0");
            }
            map.push(tempArr);
            tempArr = [];
        }
    }
    
    
}
//Current map size
let sizeX = 6;
let sizeY = 6;

//** Create testing level playground [Delete this afterwards]
resizeMap(sizeX,sizeY,true);

//3 Create character class
class Hero {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = sideLength/2.5;
        this.groundLevel = 1;
    }
    display(){
        if(map[this.y][this.x]=="block"||map[this.y][this.x]=="heroOnBlock"){
            map[this.y][this.x] = "heroOnBlock";
            this.groundLevel = 1.5;
        }else if(map[this.y][this.x]=="stairs"||map[this.y][this.x]=="heroOnStairs"){
            map[this.y][this.x] = "heroOnStairs";
            this.groundLevel = 1.25;
        }else if(map[this.y][this.x]=="box"||map[this.y][this.x]=="heroOnBox"){
            map[this.y][this.x] = "heroOnBox";
            this.groundLevel = 1.5;
        }else{
            map[this.y][this.x] = "hero";
            this.groundLevel = 1;
        }
        
        c.fillStyle = "red";
        c.fillRect(this.x*sideLength+(sideLength-this.size*this.groundLevel)/2,this.y*sideLength+wallHeight+(sideLength-this.size*this.groundLevel)/2,this.size*this.groundLevel,this.size*this.groundLevel)
        c.fillStyle = "black";
    }

    move(direction){
        switch (direction){
            case "north":
                if(this.y==0){
                    //Do not move
                }else if(map[this.y-1][this.x]=="block"&&this.groundLevel == 1){
                    //Do not move
                }else if(map[this.y-1][this.x]=="stairs"&&this.groundLevel == 1){
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y-1==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                           map[this.y][this.x]="0";
                            this.y -= 1;
                            this.groundLevel = 1.25;
                            break;
                        }
                    }
                }else if(map[this.y-1][this.x]=="block"&&this.groundLevel == 1.25){
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                            this.y -= 1;
                            this.groundLevel = 1.5;;
                            break;
                        }
                    }
                }else if(map[this.y-1][this.x]=="box"&&this.groundLevel == 1){
                    let boxesPositions = [this.y-1];
                    for(i=1;i<map.length;i++){
                        if(this.y-1-i<0||map[this.y-1-i][this.x]=="block"||map[this.y-1-i][this.x]=="stairs"){
                            break;
                        }else if(map[this.y-1-i][this.x]=="box"){
                            boxesPositions.unshift(this.y-1-i);
                        }else{
                            for(i=0;i<boxesPositions.length;i++){
                                for(j=0;j<entitiesD.length;j++){
                                    if(entitiesD[j].x==this.x&&entitiesD[j].y==boxesPositions[i]){
                                        entitiesD[j].y -= 1;
                                        break;
                                        //push
                                    }
                                }
                            }
                            map[this.y-1][this.x]= "0";
                            break;
                        }
                    }
                }else if(map[this.y-1][this.x]=="box"&&this.groundLevel == 1.25){
                    let canPush = true;
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                            this.y -= 1;
                            this.groundLevel = 1.5;
                            canPush = false;
                            break;
                        }
                    }
                    if(canPush){
                        let boxesPositions = [this.y-1];
                        for(i=1;i<map.length;i++){
                             if(this.y-1-i<0||map[this.y-1-i][this.x]=="block"||map[this.y-1-i][this.x]=="stairs"){
                                break;
                            }else if(map[this.y-1-i][this.x]=="box"){
                                boxesPositions.unshift(this.y-1-i);
                            }else{
                                for(i=0;i<boxesPositions.length;i++){
                                    for(j=0;j<entitiesD.length;j++){
                                        if(entitiesD[j].x==this.x&&entitiesD[j].y==boxesPositions[i]){
                                            entitiesD[j].y -= 1;
                                            break;
                                            //push
                                        }
                                    }
                                }   
                                map[this.y-1][this.x]= "0";
                                break;
                            }
                        }
                    }
                }else{
                    if(map[this.y][this.x]=="heroOnBlock"){
                        map[this.y][this.x] = "block";
                    }else if(map[this.y][this.x]=="heroOnStairs"){
                        map[this.y][this.x] = "stairs";
                    }else if(map[this.y][this.x]=="heroOnBox"){
                        map[this.y][this.x] = "box";
                    }else{
                        map[this.y][this.x] = "0";
                        
                    }
                    this.y -= 1;
                }
                break;
            case "south":
                if(this.y==sizeY){
                    //Do not move
                }else if(map[this.y+1][this.x]=="block"&&this.groundLevel == 1){
                    //Do not move
                }else if(map[this.y+1][this.x]=="stairs"&&this.groundLevel == 1){
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y+1==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                           map[this.y][this.x]="0";
                            this.y += 1;
                            this.groundLevel = 1.25;
                            break;
                        }
                    }
                    
                }else if(map[this.y+1][this.x]=="block"&&this.groundLevel == 1.25){
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                            this.y += 1;
                            this.groundLevel = 1.5;;
                            break;
                        }
                    }
                }else if(map[this.y+1][this.x]=="box"&&this.groundLevel == 1){
                    let boxesPositions = [this.y+1];
                    for(i=1;i<map.length;i++){
                        if(this.y+1+i>sizeY||map[this.y+1+i][this.x]=="block"||map[this.y+1+i][this.x]=="stairs"){
                            break;
                        }else if(map[this.y+1+i][this.x]=="box"){
                            boxesPositions.unshift(this.y+1+i);
                        }else{
                            for(i=0;i<boxesPositions.length;i++){
                                for(j=0;j<entitiesD.length;j++){
                                    if(entitiesD[j].x==this.x&&entitiesD[j].y==boxesPositions[i]){
                                        entitiesD[j].y+=1;
                                        break;
                                        //push
                                    }
                                }
                            }
                            map[this.y+1][this.x]= "0";
                            break;
                        }
                    }
                }else if(map[this.y+1][this.x]=="box"&&this.groundLevel == 1.25){
                    let canPush = true;
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                            this.y += 1;
                            this.groundLevel = 1.5;
                            canPush = false;
                            break;
                        }
                    }
                    if(canPush){
                        let boxesPositions = [this.y+1];
                        for(i=1;i<map.length;i++){
                            if(this.y+1+i>sizeY||map[this.y+1+i][this.x]=="block"||map[this.y+1+i][this.x]=="stairs"){
                                break;
                            }else if(map[this.y+1+i][this.x]=="box"){
                                boxesPositions.unshift(this.y+1+i);
                            }else{
                                for(i=0;i<boxesPositions.length;i++){
                                    for(j=0;j<entitiesD.length;j++){
                                        if(entitiesD[j].x==this.x&&entitiesD[j].y==boxesPositions[i]){
                                            entitiesD[j].y+=1;
                                            break;
                                            //push
                                        }
                                    }
                                }
                                map[this.y+1][this.x]= "0";
                                break;
                            }
                        }
                    }
                }else{
                    if(map[this.y][this.x]=="heroOnBlock"){
                        map[this.y][this.x] = "block";
                    }else if(map[this.y][this.x]=="heroOnStairs"){
                        map[this.y][this.x] = "stairs";
                    }else if(map[this.y][this.x]=="heroOnBox"){
                        map[this.y][this.x] = "box";
                    }else{
                        map[this.y][this.x] = "0";
                    }
                    this.y += 1;
                }
                break;
            case "east":
                if(this.x==sizeX){
                    //Do not move
                }else if(map[this.y][this.x+1]=="block"&&this.groundLevel == 1){
                    //Do not move
                }else if(map[this.y][this.x+1]=="stairs"&&this.groundLevel == 1){
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x+1==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                           map[this.y][this.x]="0";
                            this.x += 1;
                            this.groundLevel = 1.25;
                            break;
                        }
                    }
                    
                }else if(map[this.y][this.x+1]=="block"&&this.groundLevel == 1.25){
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                            this.x += 1;
                            this.groundLevel = 1.5;;
                            break;
                        }
                    }
                }else if(map[this.y][this.x+1]=="box"&&this.groundLevel == 1){
                    let boxesPositions = [this.x+1];
                    for(i=1;i<map.length;i++){
                        if(this.x+1+i>sizeX||map[this.y][this.x+1+i]=="block"||map[this.y][this.x+1+i]=="stairs"){
                            break;
                        }else if(map[this.y][this.x+1+i]=="box"){
                            boxesPositions.unshift(this.x+1+i);
                        }else{
                            for(i=0;i<boxesPositions.length;i++){
                                for(j=0;j<entitiesD.length;j++){
                                    if(entitiesD[j].y==this.y&&entitiesD[j].x==boxesPositions[i]){
                                        entitiesD[j].x+=1;
                                        break;
                                        //push
                                    }
                                }
                            }
                            map[this.y][this.x+1]= "0";
                            break;
                        }
                    }
                }else if(map[this.y][this.x+1]=="box"&&this.groundLevel == 1.25){
                    let canPush = true;
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                            this.x += 1;
                            this.groundLevel = 1.5;
                            canPush = false;
                            break;
                        }
                    }
                    if(canPush){
                        let boxesPositions = [this.x+1];
                        for(i=1;i<map.length;i++){
                            if(this.x+1+i>sizeX||map[this.y][this.x+1+i]=="block"||map[this.y][this.x+1+i]=="stairs"){
                                break;
                            }else if(map[this.y][this.x+1+i]=="box"){
                                boxesPositions.unshift(this.x+1+i);
                            }else{
                                for(i=0;i<boxesPositions.length;i++){
                                    for(j=0;j<entitiesD.length;j++){
                                        if(entitiesD[j].y==this.y&&entitiesD[j].x==boxesPositions[i]){
                                            entitiesD[j].x+=1;
                                            break;
                                            //push
                                        }
                                    }
                                }
                                map[this.y][this.x+1]= "0";
                                break;
                            }   
                        }
                    }
                }else{
                    if(map[this.y][this.x]=="heroOnBlock"){
                        map[this.y][this.x] = "block";
                    }else if(map[this.y][this.x]=="heroOnStairs"){
                        map[this.y][this.x] = "stairs";
                    }else if(map[this.y][this.x]=="heroOnBox"){
                        map[this.y][this.x] = "box";
                    }else{
                        map[this.y][this.x] = "0";
                    }
                    this.x += 1;
                }
                break;
            case "west":
                if(this.x==0){
                    //Do not move
                }else if(map[this.y][this.x-1]=="block"&&this.groundLevel == 1){
                    //Do not move
                }else if(map[this.y][this.x-1]=="stairs"&&this.groundLevel == 1){
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x-1==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                            map[this.y][this.x]="0";
                            this.x -= 1;
                            this.groundLevel = 1.25;
                            break;
                        }
                    }
                    
                }else if(map[this.y][this.x-1]=="block"&&this.groundLevel == 1.25){
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                            this.x -= 1;
                            this.groundLevel = 1.5;;
                            break;
                        }
                    }
                }else if(map[this.y][this.x-1]=="box"&&this.groundLevel == 1){
                    let boxesPositions = [this.x-1];
                    for(i=1;i<map.length;i++){
                        if(this.x-1-i<0||map[this.y][this.x-1-i]=="block"||map[this.y][this.x-1-i]=="stairs"){
                            break;
                        }else if(map[this.y][this.x-1-i]=="box"){
                            boxesPositions.unshift(this.x-1-i);
                        }else{
                            for(i=0;i<boxesPositions.length;i++){
                                for(j=0;j<entitiesD.length;j++){
                                    if(entitiesD[j].y==this.y&&entitiesD[j].x==boxesPositions[i]){
                                        entitiesD[j].x-=1;
                                        break;
                                        //push
                                    }
                                }
                            }
                            map[this.y][this.x-1]= "0";
                            break;
                        }
                    }
                }else if(map[this.y][this.x-1]=="box"&&this.groundLevel == 1.25){
                    let canPush = true;
                    for (i=0;i<entitiesC.length;i++){
                        if(this.x==entitiesC[i].x&&this.y==entitiesC[i].y&&direction==entitiesC[i].direction){
                           //move
                            this.x -= 1;
                            this.groundLevel = 1.5;
                            canPush = false;
                            break;
                        }
                    }
                    if(canPush){
                        let boxesPositions = [this.x-1];
                        for(i=1;i<map.length;i++){
                            if(this.x-1-i<0||map[this.y][this.x-1-i]=="block"||map[this.y][this.x-1-i]=="stairs"){
                                break;
                            }else if(map[this.y][this.x-1-i]=="box"){
                             boxesPositions.unshift(this.x-1-i);
                            }else{
                                for(i=0;i<boxesPositions.length;i++){
                                    for(j=0;j<entitiesD.length;j++){
                                        if(entitiesD[j].y==this.y&&entitiesD[j].x==boxesPositions[i]){
                                            entitiesD[j].x-=1;
                                            break; 
                                            //push
                                        }
                                    }
                                }
                                map[this.y][this.x-1]= "0";
                                break;
                            }
                        }
                    }
                }else{
                    if(map[this.y][this.x]=="heroOnBlock"){
                        map[this.y][this.x] = "block";
                    }else if(map[this.y][this.x]=="heroOnStairs"){
                        map[this.y][this.x] = "stairs";
                    }else if(map[this.y][this.x]=="heroOnBox"){
                        map[this.y][this.x] = "box";
                    }else{
                        map[this.y][this.x] = "0";
                    }
                    this.x -= 1;
                }
                break;
        }
    }
}
//3.1 Entities array [A: MovingCharacters]
let entitiesA = [];

//4 Add event listeners to make the character move
document.addEventListener("keydown", keyIsDown);
let pressedKey=[false,1];
function keyIsDown(e){
    pressedKey = [true,e.keyCode]
}
document.addEventListener("keyup", keyIsUp);
function keyIsUp(e){
    if(pressedKey[0]&&pressedKey[1]==38){
        pressedKey[0]=false;
        checkWin();
        for (i=0;i<entitiesA.length;i++){
            entitiesA[i].move("north");
        }
    }else if(pressedKey[0]&&pressedKey[1]==40){
        pressedKey[0]=false;
        for (i=0;i<entitiesA.length;i++){
            entitiesA[i].move("south");
        }
    }else if(pressedKey[0]&&pressedKey[1]==37){
        pressedKey[0]=false;
        for (i=0;i<entitiesA.length;i++){
            entitiesA[i].move("west");
        }
    }else if(pressedKey[0]&&pressedKey[1]==39){
        pressedKey[0]=false;
        for (i=0;i<entitiesA.length;i++){
            entitiesA[i].move("east");
        }
    }else if(pressedKey[0]&&pressedKey[1]==67){
        pressedKey[0]=false;
        console.log(map);
    }
}
//5 Blocks
class Block{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    display(){
        map[this.y][this.x] = "block";
        c.fillRect(sideLength*this.x,sideLength*this.y+wallHeight,sideLength,sideLength);
        c.strokeStyle="black";
    }
}
//5.1 Entities array [B: UnmovableBlocks]
let entitiesB = [];

//6 Stairs
class Stairs{
    constructor(x,y,direction){
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    display(){
        map[this.y][this.x] = "stairs";
        switch(this.direction){
            case "north":
                c.fillStyle = "#606060";
                c.fillRect(sideLength*this.x,sideLength*(this.y+1)+wallHeight-sideLength*2/14,sideLength,sideLength*2/14);
                c.fillStyle = "#404040";
                c.fillRect(sideLength*this.x,sideLength*(this.y+1)+wallHeight-sideLength*5/14,sideLength,sideLength*3/14);
                c.fillStyle = "#606060";
                c.fillRect(sideLength*this.x,sideLength*(this.y+1)+wallHeight-sideLength*9/14,sideLength,sideLength*4/14);
                c.fillStyle = "#404040";
                c.fillRect(sideLength*this.x,sideLength*(this.y)+wallHeight,sideLength,sideLength*5/14);
                c.fillStyle = "black";
                break;
            case "south":
                c.fillStyle = "#606060";
                c.fillRect(sideLength*this.x,sideLength*(this.y)+wallHeight,sideLength,sideLength*2/14);
                c.fillStyle = "#404040";
                c.fillRect(sideLength*this.x,sideLength*(this.y)+wallHeight+sideLength*2/14,sideLength,sideLength*3/14);
                c.fillStyle = "#606060";
                c.fillRect(sideLength*this.x,sideLength*(this.y)+wallHeight+sideLength*5/14,sideLength,sideLength*4/14);
                c.fillStyle = "#404040";
                c.fillRect(sideLength*this.x,sideLength*(this.y)+wallHeight+sideLength*9/14,sideLength,sideLength*5/14);
                c.fillStyle = "black";
                break;
            case "east":
                c.fillStyle = "#606060";
                c.fillRect(sideLength*this.x,sideLength*(this.y)+wallHeight,sideLength*2/14,sideLength);
                c.fillStyle = "#404040";
                c.fillRect(sideLength*this.x+sideLength*2/14,sideLength*(this.y)+wallHeight,sideLength*3/14,sideLength);
                c.fillStyle = "#606060";
                c.fillRect(sideLength*this.x+sideLength*5/14,sideLength*(this.y)+wallHeight,sideLength*4/14,sideLength);
                c.fillStyle = "#404040";
                c.fillRect(sideLength*this.x+sideLength*9/14,sideLength*(this.y)+wallHeight,sideLength*5/14,sideLength);
                c.fillStyle = "black";
                break;
            case "west":
                c.fillStyle = "#606060";
                c.fillRect(sideLength*(this.x+1)-sideLength*2/14,sideLength*(this.y)+wallHeight,sideLength*2/14,sideLength);
                c.fillStyle = "#404040";
                c.fillRect(sideLength*(this.x+1)-sideLength*5/14,sideLength*(this.y)+wallHeight,sideLength*3/14,sideLength);
                c.fillStyle = "#606060";
                c.fillRect(sideLength*(this.x+1)-sideLength*9/14,sideLength*(this.y)+wallHeight,sideLength*4/14,sideLength);
                c.fillStyle = "#404040";
                c.fillRect(sideLength*this.x,sideLength*(this.y)+wallHeight,sideLength*5/14,sideLength);
                c.fillStyle = "black";
                break;
        }
    }
}
//6.1 Entities array [C: Stairs]
let entitiesC = [];

//7 Boxes
class Box{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    display(){
        map[this.y][this.x] = "box";

        c.beginPath();
        c.fillStyle = "#D2691E";
        c.lineWidth = 3.5;
        c.rect(this.x*sideLength,this.y*sideLength+wallHeight,sideLength,sideLength);
        c.fill();
        c.stroke();
        c.fillStyle = "black";
        c.lineWidth = 2;
    }
}
//7.1 Entities array [D: Box]
let entitiesD = [];

//8 Winning detection
let win = false;
let winSpot = 2;
function checkWin(){
    for(i=0;i<entitiesA.length;i++){
        if(entitiesA[i].x==winSpot&&entitiesA[i].y==0&&entitiesA[i].groundLevel>1){
            win = true;
            break;
        }
    }
}
function drawWinSpot(){
    c.fillStyle = "#606060";
    c.fillRect(sideLength*winSpot,0,sideLength,wallHeight);
    c.fillStyle = "black";
}
//Change levels
let level = 6;
function changeLevel(level){
    switch(level){
        case 1:
            winSpot=3;
            sizeX=3;
            sizeY=2;
            resizeMap(sizeX,sizeY,true);
            entitiesA.push(new Hero(1,2));
            entitiesB.push(new Block(3,0));
            entitiesB.push(new Block(1,0));
            entitiesB.push(new Block(0,0));
            entitiesB.push(new Block(0,1));
            entitiesC.push(new Stairs(1,1,"west"));
            entitiesD.push(new Box(2,1));
            break;
        case 2:
            winSpot=2;
            sizeX=2;
            sizeY=2;
            resizeMap(sizeX,sizeY,true);
            entitiesA.push(new Hero(1,2));
            entitiesB.push(new Block(2,0));
            entitiesB.push(new Block(2,1));
            entitiesB.push(new Block(0,0));
            entitiesC.push(new Stairs(0,1,"north"));
            entitiesD.push(new Box(1,1));
            break;
        case 3:
            winSpot=0;
            sizeX=4;
            sizeY=3;
            resizeMap(sizeX,sizeY,true);
            entitiesA.push(new Hero(0,0));
            entitiesB.push(new Block(0,1));
            entitiesB.push(new Block(0,2));
            entitiesB.push(new Block(1,3));
            entitiesB.push(new Block(4,3));
            entitiesB.push(new Block(0,3));
            entitiesC.push(new Stairs(2,3,"west"));
            entitiesD.push(new Box(1,0));
            entitiesD.push(new Box(3,2));
            break;
        case 4:
            winSpot=4;
            sizeX=4;
            sizeY=2;
            resizeMap(sizeX,sizeY,true);
            entitiesA.push(new Hero(0,2));
            entitiesB.push(new Block(0,0));
            entitiesB.push(new Block(1,0));
            entitiesB.push(new Block(3,0));
            entitiesC.push(new Stairs(0,1,"north"));
            entitiesD.push(new Box(2,0));
            entitiesD.push(new Box(2,1));
            entitiesD.push(new Box(3,1));
            break;
        case 5:
            winSpot=3;
            sizeX=3;
            sizeY=3;
            resizeMap(sizeX,sizeY,true);
            entitiesA.push(new Hero(3,3));
            entitiesB.push(new Block(0,0));
            entitiesB.push(new Block(1,0));
            entitiesB.push(new Block(2,0));
            entitiesB.push(new Block(0,2));
            entitiesB.push(new Block(0,3));
            entitiesC.push(new Stairs(1,3,"west"));
            entitiesD.push(new Box(1,2));
            entitiesD.push(new Box(1,1));
            break;
        case 6:
            winSpot=4;
            sizeX=5;
            sizeY=4;
            resizeMap(sizeX,sizeY,true);
            entitiesA.push(new Hero(5,4));
            entitiesB.push(new Block(0,0));
            entitiesB.push(new Block(2,0));
            entitiesB.push(new Block(4,0));
            entitiesB.push(new Block(5,0));
            entitiesB.push(new Block(0,2));
            entitiesB.push(new Block(2,3));
            entitiesB.push(new Block(2,4));
            entitiesC.push(new Stairs(0,3,"north"));
            entitiesC.push(new Stairs(4,3,"west"));
            entitiesC.push(new Stairs(4,1,"west"));            
            entitiesD.push(new Box(1,2));
            entitiesD.push(new Box(1,3));
            entitiesD.push(new Box(3,1));
            entitiesD.push(new Box(4,4));
            break;
        case 7:
            winSpot=2;
            sizeX=6;
            sizeY=4;
            resizeMap(sizeX,sizeY,true);
            entitiesA.push(new Hero(0,4));
            entitiesB.push(new Block(0,0));
            entitiesB.push(new Block(1,1));
            entitiesB.push(new Block(3,1));
            entitiesB.push(new Block(5,0));
            entitiesB.push(new Block(6,1));
            entitiesB.push(new Block(3,3));
            entitiesB.push(new Block(5,4));
            entitiesC.push(new Stairs(0,3,"north"));
            entitiesC.push(new Stairs(2,3,"east"));
            entitiesC.push(new Stairs(4,3,"south"));
            entitiesC.push(new Stairs(5,2,"east"));
            entitiesC.push(new Stairs(5,3,"west"));
            entitiesC.push(new Stairs(4,1,"south"));
            /*
            entitiesD.push(new Box(1,2));
            entitiesD.push(new Box(1,3));
            entitiesD.push(new Box(3,1));
            entitiesD.push(new Box(4,4));
            */
    }
}

//...999 Draw
changeLevel(level);

console.log(map);


let count = 0;
function draw(){
    requestAnimationFrame(draw);
    if(win==false){
        //Refresh
        c.clearRect(0, 0, playground.width, playground.height);
        //Draw canvas
        resizeMap(sizeX,sizeY,false);
        //Draw every EntityC(Stairs)
        for (i=0;i<entitiesC.length;i++){
            entitiesC[i].display();
        }
        //Draw every EntityD(Box)
        for (i=0;i<entitiesD.length;i++){
            entitiesD[i].display();
        }
        //Draw every EntityB(UnmovableBlocks)
        for (i=0;i<entitiesB.length;i++){
            entitiesB[i].display();
        }
        //Draw every EntityA(character)
        for (i=0;i<entitiesA.length;i++){
            entitiesA[i].display();
        }
        //Draw winSpot
        drawWinSpot();
    }else{
        let maximumCount = 25;
        if(count<maximumCount){
            count++;
            c.fillRect(0,(sideLength*(sizeY+1)+wallHeight)-(count/maximumCount)*(sideLength*(sizeY+1)+wallHeight),(sizeX+1)*sideLength,sideLength*(sizeY+1)+wallHeight);
            //Draw winning
        }else if(count==maximumCount){
            c.clearRect(0, 0, playground.width, playground.height);
            entitiesA=[];
            entitiesB=[];
            entitiesC=[];
            entitiesD=[];
            level++;
            changeLevel(level);
            count++;
        }else{
            count=0;
            win=false;
        }
        
    }
    
}
draw();
/*
To do:
1-Finish 7th level(add boxes)
2-Do stairs interaction(Acyion of hero from middle ground)

*/