var socket = io();

socket.on('send stat', function(obj){
    document.getElementById("grass").innerHTML = obj.grass;
    document.getElementById("grassEater").innerHTML = obj.grassEater;
    document.getElementById("predator").innerHTML = obj.predator;
    document.getElementById("les").innerHTML = obj.scavenger;
});