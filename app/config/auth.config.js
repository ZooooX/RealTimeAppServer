const fs = require("fs");
const path = require("path");

const pathToPrivateKey = path.join(__dirname, '/keys/id_rsa_priv.pem');
const pathToPublicKey = path.join(__dirname, '/keys/id_rsa_pub.pem');

const privateKey = fs.readFileSync(pathToPrivateKey,"utf8");
const publicKey = fs.readFileSync(pathToPublicKey,"utf8");

module.exports = {
    private_key : privateKey,
    public_key : publicKey
};