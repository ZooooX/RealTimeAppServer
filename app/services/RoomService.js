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
}

module.exports = RoomService;