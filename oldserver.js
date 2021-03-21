const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.Server(app);

const io = require('socket.io')(server, {
  cors : {
    origin : 'localhost:4200',
  },
});

var corsOptions = {
  origin: 'localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.static('public'));

const tictactoe = { rooms : [] } ;
const connectfour = { rooms : [] } ;

const GAMES = { 1 : "tictactoe", 2 : "connectfour"};

io.on('connection', function (socket) {
    console.log("A user connected");


    //si l'utilisateur change son profil
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
      socket.emit('you-joined',{username: socket.username});

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
      let newRoom = data.roomId;
      if (data.game === GAMES[1]) {
        if(tictactoe.rooms.includes(newRoom)){
          return;
        }
        tictactoe.rooms.push(newRoom);
        console.log("tictactoe : "+tictactoe.rooms);
        socket.broadcast.emit("rooms",tictactoe.rooms);
        socket.emit("rooms",tictactoe.rooms);
      }
      else if (data.game === GAMES[2]) {
        if(connectfour.rooms.includes(newRoom)){
          return;
        }
        connectfour.rooms.push(newRoom);
        console.log("connectfour : "+connectfour.rooms);
        socket.broadcast.emit("rooms",connectfour.rooms);
        socket.emit("rooms",connectfour.rooms);
      }
      console.log(tictactoe.rooms)
    });
});

server.listen(3000, () => {
    console.log("Socket.io server is listening on port 3000");
});
