const jwt = require("jsonwebtoken");
const publicKey = require ("../config/auth.config.js").public_key;

verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    
    if(authHeader){
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(403).send({message : "No token provided!"});
        }
        jwt.verify(token, publicKey, (err, decoded) => {
            if(err){
                return res.status(401).send({message : "Unauthorized!"});
            }
    
            req.userId = decoded.id;
            next();
        });
    }
    else{
        return res.status(401).send({message:'No auth header'});
    }
};

const authJwt = {
    verifyToken
};

module.exports = authJwt;