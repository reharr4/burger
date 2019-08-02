// import MySQL connection
var connection = require("./connection.js");

// helps generate MySQL syntax
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  };
  
//   Create ORM object to preform SQL queries
var orm = {
    // function that returns all table entries
    selectAll: function (tableInput, cb) {
        // query string that returns all rows from target table
        var queryString = "SELECT * FROM " + tableInput + ";";
       
        //performs database query    
        connection.query(queryString, function (err, res) {
            if (err) {
                throw err;
            }
            // returns results in callback
            cb(res);
        });
    },
    
    // function that returns single table entry
    insertOne: function (table, cols, vals, cb) {
        // query string that returns single row into target table
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        // database query
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            // return results in callback
            cb(result);
        });
    },

    // function that updates single table entry
    updateOne: function (table, objColVals, condition, cb) {
        // query string that updates single entry in target table
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        // perform database query
        connection.query(queryString, function (err, res) {
            if (err) {
                throw err;
            }
            // return results in callback
            cb(res);
        });
    }
};

// export orm object for use in other modules
module.exports = orm;