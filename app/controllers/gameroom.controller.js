const RoomService = require('../services/RoomService');
const roomServiceInstance = new UserService();

exports.addRoom = (req,res) => {
    const baseroom = new Baseroom({
        name : req.body.name,
        visibility : req.body.visibility,
        
    });

    //save chatroom
    chatroom.save((err, chatroom) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    });
}

