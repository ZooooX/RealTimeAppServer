const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;

db.user = require('./user.model');
db.baseroom = require('./baseroom.model');
db.game = require('./game.model');

module.exports = db;