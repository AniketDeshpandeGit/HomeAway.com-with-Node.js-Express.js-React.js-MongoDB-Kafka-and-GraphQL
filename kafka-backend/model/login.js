// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;

// var Login = new Schema({
//     username : String,
//     password : String,
//     phonenumber :String,
//     city :String,
//     age : String,
//     id : Number,

// });

// module.exports = mongoose.model("login_details", Login);

var mongoose = require('mongoose');

var Login = mongoose.model('login_details',{
    username :{
        type : String
    },
    password : {
        type : String
    },
    phonenumber : {
        type : String
    },
    city : {
        type : String
    },
    age : {
        type : String
    },
    id :{
        type: Number
    }
    
});

module.exports = {Login};