var express = require('express');

var app = express();


 var db =  require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 


var UserController = require('./routes/UserController');
var LoginController = require('./routes/LoginController');


app.use('/api/v1/users', UserController);
app.use('/api/v1/login', LoginController);

module.exports = app;