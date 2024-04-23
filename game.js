let gravity = 0.05;
let isGrounded = true;
let win = false;

sprites.push({
    name: "player",
    vel: [0, 0],
    size: [100, 100],
    pos: [10, canvas.height - 100],
    sheet: getSheetById("player"),
    cut: [0, 0, 10, 10],
    hidden: false
});

let player = getSpriteByName("player");

//listen for move keys
function listenMove(e) {
    if ((e.code == "KeyW" || e.code == "ArrowUp") && isGrounded) {
        player.vel[1] = -4;
        isGrounded = false;
    }
    else if (e.code == "KeyA" || e.code == "ArrowLeft") {
        player.vel[0] = -2;
    } 
    else if (e.code == "KeyD" || e.code == "ArrowRight") {
        player.vel[0] = 2;
    }
    /* 

    "Test" key
    else if (e.code == "KeyR") {
        console.log("x" + player.pos[0] + "y" + player.pos[1]);
        console.log("first" + (player.pos[1] + player.size[1]));
        console.log("second" + (obst1.y - player.size[0]/4));

        console.log(obst1.y - player.size[1] + 1);
    }
    
    */
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

    //Check for being on ground
    if(player.vel[1] == 0){
        isGrounded = true;
    }

    //Check for player in bounds
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

function collisionMaster(obst){
    //Check for collision with object
    //top
    if((player.pos[1] + player.size[1] > obst.y) && (player.pos[1] + player.size[1] < obst.y + obst.hei/16) && (player.pos[0] + player.size[0] > obst.x) && (player.pos[0] < obst.x + obst.len)){
        player.pos[1] = obst.y - player.size[1];
        player.vel[1] = 0;
    }
    //left
    else if((player.pos[0] > obst.x - player.size[0]) && (player.pos[0] + player.size[0] < obst.x + player.size[0]/4) && (player.pos[1] > obst.y - player.size[1] + 1) && (player.pos[1] < canvas.height)){
        player.pos[0] = obst.x - player.size[0];
    }
    //right
    else if((player.pos[0] < obst.x + obst.len) && (player.pos[0] > obst.x + obst.len/2) && (player.pos[1] > obst.y - player.size[1] + 1) && (player.pos[1] < canvas.height)){
        player.pos[0] = obst.x + obst.len;
    }
    requestAnimationFrame(collisionMaster);
}

function checkWin(obst){
    //Check for collision with object
    //top
    if((player.pos[1] + player.size[1] > obst.y) && (player.pos[1] + player.size[1] < obst.y + obst.hei/4) && (player.pos[0] + player.size[0] > obst.x) && (player.pos[0] < obst.x + obst.len)){
        player.pos[1] = obst.y - player.size[1];
        player.vel[1] = 0;
        win = true;
    }
    //left
    else if((player.pos[0] > obst.x - player.size[0]) && (player.pos[0] + player.size[0] < obst.x + player.size[0]/4) && (player.pos[1] > obst.y - player.size[1] + 1) && (player.pos[1] < canvas.height)){
        player.pos[0] = obst.x - player.size[0];
        win = true;
    }
    //right
    else if((player.pos[0] < obst.x + obst.len) && (player.pos[0] > obst.x + obst.len/2) && (player.pos[1] > obst.y - player.size[1] + 1) && (player.pos[1] < canvas.height)){
        player.pos[0] = obst.x + obst.len;
        win = true;
    }
    requestAnimationFrame(checkWin);
}

window.addEventListener("keydown", listenMove);
window.addEventListener("keyup", listenUp);

checkPlayerState();
draw();