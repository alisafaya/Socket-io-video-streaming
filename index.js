const express = require('express');
const socket = require('socket.io')
// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

// App
const app = new express();
const server = app.listen(PORT, function() {
	console.log('listening on port 5000');
});


app.use(express.static(__dirname + '/public'));



var io = socket(server);
io.on('connection', function(socket) {
	//console.log('socket connection was made', socket.id);
	socket.on('speak', function(buffer) {
		io.sockets.emit('play',buffer);
	});

	socket.on('stream', function(image){
		io.sockets.emit('stream', image);
	});
});


