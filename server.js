// All dependencies and CALL express
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
// var chosen = require('chosen.js');


var app = express();

// Set up express server and port below
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// required route files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Listener
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});