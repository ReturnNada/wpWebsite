const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

class obstacle{
    constructor(len, hei){
        this.len = len;
        this.hei = hei;
    }

    drawObst(x, y, color){  
        this.x = x;
        this.y = y;

        let col = color.toString();

        ctx.fillStyle = col;
        ctx.fillRect(x, y, this.len, this.hei);
    }
}

let obst1 = new obstacle(120, 120);
let obst2 = new obstacle(120, 240);
let key = new obstacle(20, 20);

let sprites = [];
//gets a spritesheet by its data-id attribute
function getSheetById(id) {
    let sheets = document.querySelectorAll(".sheet");
    for (let i=0; i < sheets.length; i++) {
        if (sheets[i].dataset.id == id) {
            return sheets[i];
        }
    }
    return null;
}

//gets a sprite by name
function getSpriteByName(name) {
    let keys = Object.keys(sprites);
    let vals = Object.values(sprites);
    for (let i=0; i < keys.length; i++) {
        if (vals[i].name == name) {
            return sprites[keys[i]];
        }
    }
    return null;
}

//draws everything!!
function draw() {
    let keys = Object.keys(sprites);
    let vals = Object.values(sprites);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i < keys.length; i++) {
        let sprite = vals[i];
        if (sprite.hidden == false) {
            ctx.drawImage(sprite.sheet, ...sprite.cut, ...sprite.pos, ...sprite.size);
        }
    }
    obst1.drawObst(300, canvas.height - obst1.hei, "green");
    obst2.drawObst(650, canvas.height - obst2.hei, "green");
    key.drawObst(650 + obst2.len/2 - key.len/2, canvas.height - obst2.hei - 2*key.hei, "yellow");
    
    collisionMaster(obst1);
    collisionMaster(obst2);
    checkWin(key);

    if(win){
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.fillText("You Win!", 440, 180);
    }
    
    requestAnimationFrame(draw);
}