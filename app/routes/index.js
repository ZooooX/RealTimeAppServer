/** API ROUTES */
const router = require('express').Router();

const authRoutes = require("./auth.routes");
const roomRoutes = require("./room.routes");

//middlewares
const { authJwt } = require('../middlewares');

router.get('/', function(req,res){
    res.json({
        status:'Api Working',
        message: 'Hello World'
    });
});

router.use("/auth", authRoutes);
router.use("/room",authJwt.verifyToken,roomRoutes);

module.exports = router;
