var MongoClient = require('mongodb').MongoClient;
var {Property} =require('../model/property')


function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

MongoClient.connect("mongodb://localhost:27017/login_details", function(err, db) {
   
        if (err) throw err;
        var dbo = db.db("login_details");
        var myobj = { propertykey: msg.propertykey,
        ownerkey: msg.ownerkey,
        traverllerkey: msg.traverllerkey,
    message:msg.message  };
        dbo.collection("message").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        // var query = { username: username };
        // dbo.collection("login_details").find(query).toArray(function(err, result) {
        //     if (err) throw err;
        //     console.log(result[1].username);
          db.close();
        });
      });  
      callback(null,"document inserted");

   



}

exports.handle_request = handle_request;