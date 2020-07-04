var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


const tictactoe = { rooms : [] } ;
const connectfour = { rooms : [] } ;

const GAMES = { 1 : "tictactoe", 2 : "connectfour"};

io.on('connection', function (socket) {
    console.log("A user connected");



    socket.on('username-change', function(username){
      socket.username = username;
    });

    socket.on('join-room', function(roomId){
      socket.removeAllListeners('message');
      socket.join(roomId);
      console.log(socket._events);

      console.log('user '+ socket.username + ' joined room ' + roomId);

      socket.on('message', function(data){
        socket.in(data['room']).emit('message',{message : data['message'],username : socket.username});
      });
      console.log(socket);
    });

    socket.on('leave-room', function(roomId){
      socket.leave(roomId, function (err) {
        console.log('user '+ socket.username + ' left room ' + roomId);
        console.log(socket._events);
      });
    });

    socket.on('load-rooms', function(game){
      if (game === GAMES[1]) {
        socket.emit('rooms',tictactoe.rooms);
      }
      else if (game === GAMES[2]) {
        socket.emit('rooms',connectfour.rooms);
      }
    });

    socket.on('new-room', function(data){
      if (data.game === GAMES[1]) {
        let newRoom = {roomId : data.roomId};
        tictactoe.rooms.push(newRoom);
        console.log("tictactoe : "+tictactoe.rooms);
        socket.broadcast.emit("rooms",tictactoe.rooms);
        socket.emit("rooms",tictactoe.rooms);
      }
      else if (data.game === GAMES[2]) {
        let newRoom = {roomId : data.roomId};
        connectfour.rooms.push(newRoom);
        console.log("connectfour : "+connectfour.rooms);
        socket.broadcast.emit("rooms",connectfour.rooms);
        socket.emit("rooms",connectfour.rooms);
      }
    });
});

server.listen(3000, () => {
    console.log("Socket.io server is listening on port 3000");
});
