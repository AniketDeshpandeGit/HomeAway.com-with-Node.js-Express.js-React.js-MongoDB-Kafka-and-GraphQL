var MongoClient = require('mongodb').MongoClient;
var {Property} =require('../model/property')


function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

MongoClient.connect("mongodb://localhost:27017/login_details", function(err, db) {

  
        if (err) throw err;
        var dbo = db.db("login_details");
        var myobj = {  ownerkey: msg.ownerkey,
            country: msg.country,
            streetaddress: msg.street_address,
            unit: msg.unit,
            city: msg.city,
            state: msg.statelive,
            zipcode: msg.zipcode,
            headline: msg.headline,
            property_description: msg.property_description,
            type: msg.type_house,
            bedroom: msg.bedrooms,
            accomodates: msg.accomodates,
            bathroom: msg.bathrooms,
            opendate_from: msg.startdate,
            opendate_to: msg.enddate,
            nightly_rate: msg.nightrate,
            min_stay: msg.minimumstay };
        dbo.collection("property_details").insertOne(myobj, function(err, res) {
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