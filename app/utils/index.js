const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const privateKey = require("../config/auth.config").private_key;

function hashPassword(password){
    return bcrypt.hashSync(password,8);
}


function comparePasswords(hashedPassword, password){
    return bcrypt.compareSync(password, hashedPassword);
}

/** Create a JWT expiring in 1day, with the private key */
function createJWT(userId){
    return jwt.sign({
        id : userId
    },
    privateKey,
    {
        algorithm: 'RS256',
        expiresIn : 1000 * 24 * 60 * 60
    });
}

module.exports = {
    hashPassword,
    comparePasswords,
    createJWT
}