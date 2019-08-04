// import ORM for functions to interact with database
var orm = require("../config/orm.js");

var burger = {
    // select all burger table entries
    selectAll: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },
    // variables cols and vals are arrays
    insertOne: function(cols, vals, cb){
        orm.insertOne("burgers", cols, vals, function(res){
            cb(res);
        });
    },
    // objColVals is object specifying columns as object keys with associated values
    updateOne: function(objColVals, condition, cb){
        orm.updateOne("burgers", objColVals, condition, function(res){
            cb(res);
        });
    },
};

// export database functions for controller (burgerController.js)
module.exports = burger;