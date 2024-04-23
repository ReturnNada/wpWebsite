const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

class obstacle{
    constructor(len, hei){
        this.len = len;
        this.hei = hei;
    }

    drawObst(x, y){  
        this.x = x;
        this.y = y;

        ctx.fillStyle = "green";
        ctx.fillRect(x, y, this.len, this.hei);
    }
}

let obst1 = new obstacle(120, 120);
let obst2 = new obstacle(120, 240);

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
    obst1.drawObst(300, canvas.height - obst1.hei);
    obst2.drawObst(650, canvas.height - obst2.hei);
    requestAnimationFrame(draw);
    collisionMaster(obst1);
    collisionMaster(obst2);
}