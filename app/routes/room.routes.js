const router = require('express').Router();
const gameroomController = require('../controllers/gameroom.controller');
const { verifyRoomCreation } = require('../middlewares');

router.param('name',gameroomController.load);

router.route('/')
    .get(gameroomController.getRooms)
    .post(verifyRoomCreation.checkEmptyFields,
          verifyRoomCreation.checkDuplicateRoomName,
          gameroomController.addRoom);

router.route('/:name')
    .get(gameroomController.getRoomById);


module.exports = router;

