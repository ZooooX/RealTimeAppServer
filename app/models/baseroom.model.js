const mongoose = require("mongoose");

const baseOptions = {
  discriminatorKey: 'itemtype', // our discriminator key, could be anything
  collection: 'rooms', // the name of our collection
};

const Baseroom = mongoose.model(
  "Baseroom",
  new mongoose.Schema({
    name : {type : String, required : true},
    visibility : {type : String, required : true},
    slots : {type : Number, min : 2, required : true},
    owner : {type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true}
    // joueur 
  }, baseOptions)
);

module.exports = Baseroom;