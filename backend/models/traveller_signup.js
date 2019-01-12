var mongoose = require('mongoose');

var TLogin = mongoose.model('traveller_login_details',{
    username :{
        type : String
    },
    password : {
        type : String
    },
    phonenumber : {
        type : String
    },
    aboutme : {
        type : String
    },
    city : {
        type : String
    },
    gender : {
        type : String
    },

    school : {
        type : String
    },
    hometown : {
        type : String
    }, 
    company : {
        type : String
    },    
    age : {
        type : String
    },
    id:{
        type : Number
    }
    
});

module.exports = {TLogin};