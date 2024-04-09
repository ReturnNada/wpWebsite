sprites.push({
    name: "player",
    pos: [10, 10],
    size: [100, 100],
    sheet: getSheetById("player"),
    cut: [0, 0, 10, 10],
    hidden: false
});

let player = getSpriteByName("player");

//listen for move keys
function listenMove(e) {
    if (e.code == "KeyW" || e.code == "ArrowUp") {
        player.pos[1] -= 20;
    } else if (e.code == "KeyS" || e.code == "ArrowDown") {
        player.pos[1] += 20;
    } else if (e.code == "KeyA" || e.code == "ArrowLeft") {
        player.pos[0] -= 20;
    } else if (e.code == "KeyD" || e.code == "ArrowRight") {
        player.pos[0] += 20;
    }
}
window.addEventListener("keydown", listenMove);

draw();