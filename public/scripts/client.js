var socket = io();
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var inputBuffer = new Float32Array(1);
var listen = true;
function playSound(buffer) {
    var myArrayBuffer = context.createBuffer(1, context.sampleRate, context.sampleRate);

    myArrayBuffer.copyToChannel(buffer, 0, 0);

    var source = context.createBufferSource(); // creates a sound source
    source.buffer = myArrayBuffer;
    source.playbackRate.value = 0.2; // tell the source which sound to play (the normal value would be 1 if there was no downsampling)
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now

    // note: on older systems, may have to use deprecated noteOn(time);
}

function Float32Concat(first, second) {
    var firstLength = first.length,
    result = new Float32Array(firstLength + second.length);

    result.set(first);
    result.set(second, firstLength);

    return result;
}

socket.on('play',function ( buffer) { //the function which is called from server side where buffer is given as float array, and the function passes the array to the player after recieving enough playable duration of audio
    var inBuffer = new Float32Array(buffer);
    if (listen) {
        inputBuffer = Float32Concat(inputBuffer, inBuffer);
        if (inputBuffer.length >= 8192) {
            playSound(inputBuffer);
            inputBuffer = new Float32Array(1);
        }
    }

});

socket.on('stream', function(data){
    var img = document.getElementById("play");
    img.src = data;
});


