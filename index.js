const express = require('express')
const app = express()
const bodyParser = require("body-parser");


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Data Base connection
const connection = require("./database/database");
connection
    .authenticate() 
    .then(() =>{
        console.log("Connected!");
    }).catch((error) => {
        console.log(error);
    });
    
//Controllers
const UserController = require("./controllers/Users/UserController");
app.use("/", UserController);

const JobController = require("./controllers/Jobs/JobController");
app.use("/", JobController);

//Server
app.listen(80, () =>{
    console.log('Aplicação escutando na porta 80')
})