const UserService = require('../services/UserService');
const userServiceInstance = new UserService();


checkEmptyFields = (req, res, next) => {
    if(req.body.username == "" || req.body.password == "" || req.body.email == ""  || req.body.username == undefined || req.body.password == undefined || req.body.email == undefined){
        res.status(400).send({message : 'Some fields are empty'});
        return;
    }
    next();
}


checkDuplicateUsernameOrEmail = (req,res,next) => {
    //check username
   userServiceInstance.getByField("username",req.body.username).then((user) => {
       
        if(user){
            return res.status(400).send({message : 'Username already in use'});
        }

        //check email
        userServiceInstance.getByField("email",req.body.email).then((user) => {

            if(user){
                return res.status(400).send({message : 'Email already in use'});
            }

            next();

        }).catch((err) => {
            return res.status(500).send({message : err});
        });

   }).catch((err) => {
    return res.status(500).send({message : err});
   });
};

const verifySignup = {
    checkEmptyFields,
    checkDuplicateUsernameOrEmail
}

module.exports = verifySignup;

