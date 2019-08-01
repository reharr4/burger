// set up MySQL connection
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "",
    database: "burgers_db"
});

// connect to MySQL
connection.connect(function(err){
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id: " + connection.threadId);
});

// export connection for ORM to use
module.exports = connection;