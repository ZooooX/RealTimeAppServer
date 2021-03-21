const UserService = require('../services/UserService');
const userServiceInstance = new UserService();

const utils = require('../utils');

exports.signup = (req, res) => {
    userServiceInstance.create(req.body.username, req.body.email, req.body.password)
        .then((user) => {
            console.log('User Created : ' + user);
            return res.status(200).send({
                id : user._id,
                username : user.username
            });
        }).catch((err) => {
            console.log('User creation failed : ' + err);
            return res.status(500).send({ message: err });
        });
};


exports.signin = (req, res) => {
    userServiceInstance.findByUsername(req.body.username).then((user) => {
        if(!user){
            return res.status(404).send({message : "User not found"});
        }

        if(!utils.comparePasswords(user.password,req.body.password)){
            return res.status(401).send({
                accessToken : null,
                message : "Invalid password !"
            });
        }

        let token = utils.createJWT(user._id);
        console.log('a user logged in : ' + user.username);

        res.status(200).send({
            username : user.username,
            accessToken : token
        });
        
    }).catch((err) => {
        return res.status(500).send({message : err});
    });
};