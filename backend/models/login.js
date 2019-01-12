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