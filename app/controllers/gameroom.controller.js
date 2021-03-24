const RoomService = require('../services/RoomService');
const roomServiceInstance = new RoomService();

exports.addRoom = (req,res) => {
    roomServiceInstance.create(req.body.name,req.body.visibility,req.userId)
        .then((room) => {
            console.log('Room Created : ' + room);
            return res.status(200);
        }).catch((err) => {
            return res.status(500).send({message : err});
        });
}

exports.getRooms = (req, res) => {
    roomServiceInstance.getAll().then((rooms) => {
        return res.status(200).send(rooms);
    }).catch((err) => {
        return res.status(500).send({message : err});
    });
}

exports.getRoomById = (req,res) => {
    let room = req.loadedRoom;

    return res.status(200).send({
        roomId : room._id,
        name : room.name,
        owner : room.owner
    });
}

exports.load = (req,res,next,id) => {
    roomServiceInstance.getById(id).then((room) => {
        if(!room){
            return res.status(404).send({message : "Room not found"});
        }

        req.loadedRoom = room;
        return next();
    }).catch((err) => {
        return res.status(500).send({message : err}); 
    });
}