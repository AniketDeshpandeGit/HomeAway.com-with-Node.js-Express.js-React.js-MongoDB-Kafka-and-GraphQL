var mongoose = require('mongoose');

var Property = mongoose.model('property_details',{
    ownerkey: {
        type: Number
    },
    country: {
        type : String
    },
    streetaddress: {
        type : String
    },
    unit: {
        type : String
    },
    city: {
        type : String
    },
    state: {
        type : String
    },
    zipcode: {
        type : String
    },
    headline: {
        type : String
    },
    property_description: {
        type : String
    },
    type: {
        type : String
    },
    bedroom: {
        type : String
    },
    accomodates: {
        type : String
    },
    bathroom: {
        type : String
    },
    opendate_from: {
        type : String
    },
    opendate_to: {
        type : String
    },
    nightly_rate: {
        type : String
    },
    min_stay: {
        type : String
    }
    
});

module.exports = {Property};