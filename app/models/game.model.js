const mongoose = require("mongoose");

const Game = mongoose.model(
  "Game",
  new mongoose.Schema({
    name : {type : String, required : true},
    rooms : [{type:mongoose.Schema.Types.ObjectId, ref:'Gameroom'}]
  })
);

module.exports = Game;