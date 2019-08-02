// required dependencies
var express = require("express");

var app = express();
var PORT = 3000;

// serve static content for app from "public" directory
app.use(express.static("public"));

// parse application body as json
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// require handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// import routes and give server access
var routes = require("./controllers/burgers_controllers.js");

app.use(routes);

// start server to begin listening
app.listen(PORT, function(){
    // log server-side when started
    console.log("Server listening on: http://localhost: " + PORT);
});