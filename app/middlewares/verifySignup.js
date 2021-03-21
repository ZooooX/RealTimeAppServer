const db = require("../models");
const User = db.user;


checkEmptyFields = (req, res, next) => {
    if(req.body.username == "" || req.body.password == "" || req.body.email == ""  || req.body.username == undefined || req.body.password == undefined || req.body.email == undefined){
        res.status(400).send({message : 'Some fields are empty'});
        return;
    }
    next();
}


checkDuplicateUsernameOrEmail = (req,res,next) => {
    //check username

    User.findOne({
        username : req.body.username
    }).exec((err, user) => {
        if(err){
            res.status(500).send({message : err});
            return;
        }

        if(user){
            res.status(400).send({message : 'Username already in use'});
            return;
        }

        //check email
        User.findOne({
            email : req.body.email
        }).exec((err, user) => {
            if(err){
                res.status(500).send({message : err});
                return;
            }

            if (user){
                res.status(400).send({message : 'Email already in use'});
                return;
            }

            next();
        });
    });
};


const verifySignup = {
    checkEmptyFields,
    checkDuplicateUsernameOrEmail
}

module.exports = verifySignup;

