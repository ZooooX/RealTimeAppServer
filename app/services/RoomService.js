const db = require("../models");
const Baseroom = db.baseroom;

class RoomService{
    create(name,visibility,owner){
        const room = new Baseroom({
            name : name,
            visibility : visibility,
            slots : 2,
            owner : owner
        });

        return room.save();
    }

    getById(roomId){
        return Baseroom.findById(roomId).populate("owner").exec();
    }

    getAll(){
        return Baseroom.find().populate("owner").exec();
    }

    getByField(field,value){
        let query = {};
        query[field] = value;

        return Baseroom.findOne(query).populate("owner").exec();
    }

}

module.exports = RoomService;