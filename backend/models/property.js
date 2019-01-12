var mongoose = require("mongoose");

var Property = mongoose.model("property_details", {
  ownerID: {
    type: String
  },
  country: {
    type: String
  },
  street_address: {
    type: String
  },
  unit: {
    type: String
  },
  city: {
    type: String
  },
  statelive: {
    type: String
  },
  zipcode: {
    type: String
  },
  headline: {
    type: String
  },
  property_description: {
    type: String
  },
  type_house: {
    type: String
  },
  bedrooms: {
    type: String
  },
  accomodates: {
    type: String
  },
  bathrooms: {
    type: String
  },
  startdate: {
    type: String
  },
  enddate: {
    type: String
  },
  nightrate: {
    type: String
  },
  minimumstay: {
    type: String
  }
});

module.exports = { Property };
