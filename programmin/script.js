var socket = io();

var side = 15;

function setup() {
    var canvas = createCanvas(40 * side, 40 * side);
    canvas.parent("canv");
    background('#acacac');
}

function nkarel(matrix) {
    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('darkgreen');
            } else if (matrix[y][x] == 0) {
                fill('#dddddd');
            } else if (matrix[y][x] == 2) {
                fill('yellow');
            } else if (matrix[y][x] == 3) {
                fill('red');
            } else if (matrix[y][x] == 4) {
                fill('brown');
            } else if (matrix[y][x] == 5) {
                fill('orange');
            } else if (matrix[y][x] == 6) {
                fill('#ff00ff');
            }
            rect(side * x, side * y, side, side);
        }
    }
}

function restart() {
    socket.emit("restart");
}
function clear2() {
    socket.emit("clear");
}
function killles() {
    socket.emit("killles");
}
function spawnGrassEaters() {
    socket.emit("spawnGrassEaters");
}
function spawnGrass() {
    socket.emit("spawnGrass");
}
function spawnLes() {
    socket.emit("spawnLes");
}
function spawnPredator() {
    socket.emit("spawnPredator");
}

socket.on('send matrix', nkarel);


