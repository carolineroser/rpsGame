//creating webserver
var express = require('express');

var app = express();
var server = app.listen(3002);

app.use(express.static('public'));

console.log("It Works!");

//WebSocket server
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log("New connection Socket id: " + socket.id);
	
	socket.on('choice',mouseMsg);
	
	function mouseMsg(data){
		console.log(data);
        //Send it to all OTHER clients
        socket.broadcast.emit('choice',data);
        //Send it to EVERYONE (including self)
        //io.sockets.emit('mouse', data);       
	}

	socket.on('new', newGame);
	
	function newGame(){
		console.log("new game");
		socket.broadcast.emit('new');
	}

	//socket.on("Username" , displayName);

	//function displayName(data){
	//	console.log("Username" , data);
		//socket.broadcast.emit('Username' , data);
	//}

	socket.on('disconnect', disconnected );
	
	  function disconnected() {
	    console.log('Client disconnected'+ socket.id)
        }
    
}
