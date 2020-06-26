var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var tictactoe = {rooms : { } } ;
var connectfour = {rooms : { } } ;

io.on('connection', function (socket) {
    console.log("A user connected");
    socket.on('message', function(message){
      socket.broadcast.emit('message',{message:message});
    });
});

server.listen(3000, () => {
    console.log("Socket.io server is listening on port 3000");
});
