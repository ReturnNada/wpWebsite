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