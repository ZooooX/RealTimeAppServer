const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {type : String, required : true},
    email: {type : String, required : true},
    password: {type : String, required : true},
    friends : [{type:mongoose.Schema.Types.ObjectId, ref:'User'}]
  },{
    timestamps : {
      createdAt : "created_at",
      updatedAt : "last_modified_at"
    }
  })
);

module.exports = User;