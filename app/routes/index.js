/** API ROUTES */

const router = require('express').Router();

const authRoutes = require("./auth.routes");


router.get('/', function(req,res){
    res.json({
        status:'Api Working',
        message: 'Hello World'
    });
});

router.use("/auth", authRoutes);

module.exports = router;
