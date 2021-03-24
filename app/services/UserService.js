const db = require("../models");
const User = db.user;

const utils = require('../utils');

class UserService {

    create(username,email,password){
        const user = new User({
            username : username,
            email : email,
            password : utils.hashPassword(password)
        });

        //save user
        return user.save();
    }

    findByUsername(username){
        return User.findOne({username : username}).exec();
    }

    delete(id){
        return User.findByIdAndDelete(id).exec();
    }

    getByField(field,value){
        let query = {};
        query[field] = value;

        return User.findOne(query).exec();
    }
}

module.exports = UserService;