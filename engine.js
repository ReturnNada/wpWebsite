const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

class obsticle{
    instantiateObst(xc, yc, len, wid){  
        ctx.fillStyle = "green";
        ctx.fillRect(xc, yc, len, wid);
    }
}
let obst1 = new obsticle;

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
    obst1.instantiateObst(300, canvas.height - 240, 120, 240);
    requestAnimationFrame(draw);
}