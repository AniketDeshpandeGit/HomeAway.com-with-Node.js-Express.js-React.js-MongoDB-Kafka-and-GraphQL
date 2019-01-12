// var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var {Login} =require('../model/login')
var bcrypt = require('bcryptjs');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

//     function getNextSequence(db, name, callback) {
//     console.log("ttt",name);
//     var dbo = db.db("login_details");
//     dbo.collection("counters").findAndModify( { _id: name }, null, { $inc: { seq: 1 } }, function(err, result){
//         if(err) callback(err, result);
//         console.log(result);
//         callback(err, result.value.seq);
//     } );
   
// }
//"mongodb://localhost:27017/login_details
//mongodb://Rajas:rajas123@ds151753.mlab.com:51753/login_details
MongoClient.connect("mongodb://localhost:27017/login_details", function(err, db) {
// getNextSequence(db, "login_details", function(err, result){

    const saltRounds = 10;
    var passwordbcrypt=msg.password;

    var login_data = new Login({
        username: msg.name, 
        password: msg.password,
        phonenumber:msg.phoneno,
        city:msg.city,
        age:msg.age,
        // id:result,
        
    });
    console.log("check"+login_data)
    //var dbo = db.db('traveller_login_details');
   var dbo= db.collection("login_details")
   bcrypt.hash(passwordbcrypt, saltRounds, function(err, hash) {
    dbo.insertOne({username: msg.name, 
        password: hash,
        phonenumber:msg.phoneno,
        city:msg.city,
        age:msg.age,
        // id:result
    }, function(err, res) {
       // console.log(res)
        callback(null,res);
    });
});

    // login_data.save().then((login_data)=>{
    //     console.log("Book created : ",login_data);
    //     // res.sendStatus(200).end();
    //     callback(null,"result");

    // },(err)=>{
    //     console.log("Error Creating Book");
    //     res.sendStatus(400).end();
    // });
   
    
   







    // MongoClient.connect("mongodb://localhost:27017/login_details", function(err, db){
    //     if(err){
    //         callback(null,"Cannot connect to db");
    //     }
    //     else{
    //         console.log('Connected to mongodb');
    //         console.log(msg.username)
    //         var query = {username : msg.username};
    //         console.log("query"+query)
    //         var dbo = db.db('login_details');
    //         dbo.collection("login_details").find(query).toArray(function(err,result){
    //             if(err){
    //                 //throw err;
    //                 callback(err,"Error");
    //             }
    //             if(result.length > 0){
    //                 // var hash = result[0].Password;
    //                 // bcrypt.compare(msg.password,hash,function(err,doesMatch){
    //                 //     if(doesMatch){
    //                 //         console.log("Inside result.length",result[0].userID);
    //                 console.log("Inside result length",result);
    //                         callback(null,result);
    //                 //     } else {
    //                 //         callback(null,[]);
    //                 //     }
    //                 // });
    //             }
    //             else{
    //                 console.log("Inside result length",result);
    //                 callback(null,[]);
    //             }
               
    //             // callback(null,result);
    //         });
    //     }
    // });

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
// });
});
}

exports.handle_request = handle_request;