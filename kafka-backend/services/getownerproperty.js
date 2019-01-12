// var mongo = require('./mongo');
var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;

function handle_request(msg, callback){
    var res = {};
    
    console.log("In handle request:"+ JSON.stringify(msg));
   
MongoClient.connect("mongodb://localhost:27017/login_details", function(err, db) {
    if (err) throw err;
    var dbo = db.db("login_details");
    var query = { username: msg.username};
    dbo.collection("login_details").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log( result);
      var tofind=String(result[0]._id)
      var query = { ownerkey: tofind };
    dbo.collection("property_details").find(query).toArray(function(err, result_property) {
      if (err) throw err;
      console.log(result_property);
     // res.send(result_property)
      callback(null,result_property); 
    }); 
   // callback(null,[]); 
      
    });
   
        
    
    
   }); 
    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
}

exports.handle_request = handle_request;