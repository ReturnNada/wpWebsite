const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

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
    requestAnimationFrame(draw);
}

/*
const player = document.getElementById("player");
const myDiv = document.getElementById("myDiv");
let posx = 25;
let posy = 425;
player.style.top = "425px";
player.style.left = "25px";

window.addEventListener("keydown", move);

function move(event){
    switch(event.key){
        case "w":
            posy -= 20;
            player.style.top = posy + "px";
            break;
        case "a":
            posx -= 20;
            player.style.left = posx + "px";
            break;
        case "s":
            posy += 20;
            player.style.top = posy + "px";
            break;
        case "d":
            posx += 20;
            player.style.left = posx + "px";
            break;
        default:
            break;
    }
}
*/