// require required dependencies
var express = require("express");
var router = express.Router();

// import model(burger.js) to use database functions
var burger = require("../models/burger.js");

// GET all routes and set up logic within where required
router.get("/", function (req, res){
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// POST route to create new table row
router.post("/burgers", function(req, res){
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function (res){
        // send back if of new burger
        res.json({id: res.insertId});
    });
});

// PUT route to update row
router.put("/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;

    burger.updateOne({
        devoured: true
    }, condition, function(data){
        if(res.changedRows == 0){
            // if no rows change, the ID must not exist = 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// export routes for server.js to use
module.exports = router;