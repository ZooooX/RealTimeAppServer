const express = require('express');
const cors = require('cors');
const app = express();

let apiRoutes = require('./app/routes');

var corsOptions = {
    origin : "http://localhost:4200"
};

//Port the application will listen to
const port = 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//database connection
const db = require('./app/models');
const dbConfig = require('./app/config/db.config');

const Game = db.game;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}/${dbConfig.DB}`, 
    {useNewUrlParser : true, useUnifiedTopology:true})
    .then(() => {
        console.log("Succesfully connected to database");
        db.initDB();
    })
    .catch(err => {
        console.log("Error connecting to db", err);
        process.exit();
    });


app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


app.use('/api', apiRoutes);

app.get('/', (req,res) => res.send('Hell World'));

app.listen(port, function(){
    console.log('server started on port :' + port);
});



