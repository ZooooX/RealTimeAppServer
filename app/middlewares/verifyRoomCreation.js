const RoomService = require('../services/RoomService');
const roomServiceInstance = new RoomService();


checkEmptyFields = (req, res, next) => {
    if(req.body.name == "" || req.body.visibility == "" || req.body.name == undefined || req.body.visibility == undefined){
        res.status(400).send({message : 'Some fields are empty'});
        return;
    }
    next();
}


checkDuplicateRoomName = (req,res,next) => {
    //check username
   roomServiceInstance.getByField("name",req.body.name).then((room) => {
       
        if(room){
            return res.status(400).send({message : 'Room name already in use'});
        }
        next();

   }).catch((err) => {
    return res.status(500).send({message : err});
   });
};

const verifyRoomCreation = {
    checkEmptyFields,
    checkDuplicateRoomName
}

module.exports = verifyRoomCreation;

