var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var tictactoe = {rooms : { } } ;
var connectfour = {rooms : { } } ;

io.on('connection', function (socket) {
    console.log("A user connected");


    socket.on('message', function(data){
      socket.to(data['room']).broadcast.emit('message',data['message']);
    });

    socket.on('username-change', function(username){
      socket.username = username;
    });

    socket.on('join-room', function(roomId){
      socket.join(roomId);
    });
});

server.listen(3000, () => {
    console.log("Socket.io server is listening on port 3000");
});
