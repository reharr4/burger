// import ORM for functions to interact with database
var orm = require("../config/orm.js");

var burger = {
    // select all burger table entries
    all: function(cb){
        orm.all("burger", function(res){
            cb(res);
        });
    },
    // variables cols and vals are arrays
    create: function(cols, vals, cb){
        orm.create("burger", cols, vals, function(res){
            cb(res);
        });
    },
    // objColVals is object specifying columns as object keys with associated values
    update: function(objColVals, condition, cb){
        orm.update("burger", objColVals, condition, function(res){
            cb(res);
        });
    },
};

// export database functions for controller
module.exports = burger;