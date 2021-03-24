const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;

db.user = require('./user.model');
db.baseroom = require('./baseroom.model');
db.game = require('./game.model');

//add games to the games collections if they dont exists yet
db.initDB = () => {
    db.game.countDocuments((err,count) => {
        if(!err && count === 0){
            let game = new db.game({
                name : 'Tic Tac Toe',
                rooms : []
            });
            
            game.save().then((game) => {
                console.log('Creation success : '+ game);
            }).catch( (err)=> {
                console.log("Error : " + err);
            })
        }
    });
}


module.exports = db;