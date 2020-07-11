const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);

const io = require('socket.io')(server);

app.use(express.static('public'));

const tictactoe = { rooms : [] } ;
const connectfour = { rooms : [] } ;

const GAMES = { 1 : "tictactoe", 2 : "connectfour"};

io.on('connection', function (socket) {
    console.log("A user connected");


    //si l'utilisateur change son profile
    socket.on('profile-change', function(data){
      socket.username = data['username'];
      socket.color = data['color'];
    });

    //join room + listen to messages
    socket.on('join-room', function(roomId){
      socket.removeAllListeners('message');

      socket.join(roomId);

      console.log('user '+ socket.username + ' joined room ' + roomId);

      socket.to(roomId).emit('room-joined',{username: socket.username});

      socket.on('message', function(data){
        socket.in(data['room']).emit('message',{message : data['message'],username : socket.username, color : socket.color});
      });
    });

    //leave room
    socket.on('leave-room', function(roomId){
      socket.leave(roomId, function (err) {
        console.log('user '+ socket.username + ' left room ' + roomId);
        socket.to(roomId).emit('room-left',{username: socket.username});
      });
    });

    //renvoi les salles de jeux actuelles
    socket.on('load-rooms', function(game){
      if (game === GAMES[1]) {
        socket.emit('rooms',tictactoe.rooms);
      }
      else if (game === GAMES[2]) {
        socket.emit('rooms',connectfour.rooms);
      }
    });

    //création d'une nouvelle salle pour le bon jeu
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
