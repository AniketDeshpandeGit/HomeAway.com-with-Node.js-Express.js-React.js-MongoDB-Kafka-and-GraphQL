// var mongo = require('./mongo');
var MongoClient = require('mongodb').MongoClient;

function handle_request(msg, callback){
    var res = {};
    
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log("getproperty")
    MongoClient.connect("mongodb://localhost:27017/login_details", function(err, db) {
        if (err) throw err;
        var dbo = db.db("login_details");
        var query = { city:msg.search };
        dbo.collection("property_details").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log( result);
        //res.send(result)
        callback(null,result); 
        });
    
            
        
        
    });

   // callback(null,[]); 
}

exports.handle_request = handle_request;