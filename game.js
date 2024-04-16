let gravity = 0.05;

sprites.push({
    name: "player",
    pos: [10, 10],
    vel: [0, 0],
    size: [100, 100],
    sheet: getSheetById("player"),
    cut: [0, 0, 10, 10],
    hidden: false
});

let player = getSpriteByName("player");

//listen for move keys
function listenMove(e) {
    if ((e.code == "KeyW" || e.code == "ArrowUp")) {
        player.vel[1] = -4;
        isGrounded = false;
    }
    else if (e.code == "KeyA" || e.code == "ArrowLeft") {
        player.vel[0] = -2;
    } 
    else if (e.code == "KeyD" || e.code == "ArrowRight") {
        player.vel[0] = 2;
    }
}
//listen for keys being unpressed
function listenUp(e) {
    if (e.code == "KeyA" || e.code == "ArrowLeft") {
        player.vel[0] = 0;
    } 
    if (e.code == "KeyD" || e.code == "ArrowRight") {
        player.vel[0] = 0;
    }
}

function checkPlayerState(){
    player.pos[1] += player.vel[1];
    player.pos[0] += player.vel[0];

    if(player.pos[1] > canvas.height - player.size[1]){
        player.pos[1] = canvas.height - player.size[1];
        player.vel[1] = 0;
    }
    else if(player.pos[1] < 0){
        player.pos[1] = 0;
        player.vel[1] = 0.05;
    }
    else if(player.pos[0] > canvas.width - player.size[0]){
        player.pos[0] = canvas.width - player.size[0];
    }
    else if(player.pos[0] < 0){
        player.pos[0] = 0;
    }
    else{
        player.vel[1] += gravity;
    }
    requestAnimationFrame(checkPlayerState);
}

window.addEventListener("keydown", listenMove);
window.addEventListener("keyup", listenUp);
checkPlayerState();
draw();