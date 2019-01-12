var axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

//testData
const properties = [
  {
    _id: "1235",
    ownerID: "5c0c4d554e85f33f3463f8f3",
    country: "United",
    street_address: "States",
    unit: "Of ",
    city: "San Jose",
    statelive: "CA",
    zipcode: "98689",
    headline: "jfjhgjg",
    property_description: "jjggjg",
    type_house: "jgjhgjh",
    bedrooms: "66",
    accomodates: "66",
    bathrooms: "66",
    startdate: "2018-05-24",
    enddate: "2018-07-26",
    nightrate: "976",
    minimumstay: "768"
  },
  {
    _id: "1234",
    ownerID: "5c0c4d554e85f33f3463f8f3",
    country: "Mexico",
    street_address: "Mexico",
    unit: "Of ",
    city: "San Jose",
    statelive: "CA",
    zipcode: "98689",
    headline: "jfjhgjg",
    property_description: "jjggjg",
    type_house: "jgjhgjh",
    bedrooms: "66",
    accomodates: "66",
    bathrooms: "66",
    startdate: "2018-05-24",
    enddate: "2018-07-26",
    nightrate: "976",
    minimumstay: "768"
  }
];

//UserType
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    phonenumber: { type: GraphQLString },
    city: { type: GraphQLString },
    age: { type: GraphQLString }
  })
});

//TravellerUserType
const TravellerUserType = new GraphQLObjectType({
  name: "TravellerUser",
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    phonenumber: { type: GraphQLString },
    aboutme: { type: GraphQLString },
    city: { type: GraphQLString },
    gender: { type: GraphQLString },
    school: { type: GraphQLString },
    hometown: { type: GraphQLString },
    company: { type: GraphQLString },
    age: { type: GraphQLString }
  })
});

//PropertyType
const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    _id: { type: GraphQLString },
    ownerID: { type: GraphQLString },
    country: { type: GraphQLString },
    street_address: { type: GraphQLString },
    unit: { type: GraphQLString },
    city: { type: GraphQLString },
    statelive: { type: GraphQLString },
    zipcode: { type: GraphQLString },
    headline: { type: GraphQLString },
    property_description: { type: GraphQLString },
    type_house: { type: GraphQLString },
    bedrooms: { type: GraphQLString },
    accomodates: { type: GraphQLString },
    bathrooms: { type: GraphQLString },
    startdate: { type: GraphQLString },
    enddate: { type: GraphQLString },
    nightrate: { type: GraphQLString },
    minimumstay: { type: GraphQLString }
  })
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    property: {
      type: PropertyType,
      args: {
        _id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < properties.length; i++) {
          if (properties[i]._id == args._id) {
            return properties[i];
          }
        }
      }
    },

    properties: {
      type: GraphQLList(PropertyType),
      args: {
        ownerkey: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const data = {
          ownerkey: args.ownerkey
        };

        return axios
          .get("http://localhost:3001/getownerproperty", {
            params: { data: data }
          })
          .then(res => res.data);
      }
    }
  }
});

//Mutations
const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ownersignup: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        phonenumber: { type: GraphQLString },
        city: { type: GraphQLString },
        age: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const data = {
          name: args.username,
          age: args.age,
          phoneno: args.phonenumber,
          city: args.city,
          password: args.password
        };
        return axios
          .post("http://localhost:3001/ownersignup", data)
          .then(res => res.data);
      }
    },

    travellersignup: {
      type: TravellerUserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        phonenumber: { type: GraphQLString },
        aboutme: { type: GraphQLString },
        city: { type: GraphQLString },
        gender: { type: GraphQLString },
        school: { type: GraphQLString },
        hometown: { type: GraphQLString },
        company: { type: GraphQLString },
        age: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const data = {
          name: args.username,
          password: args.password,
          age: args.age,
          multiline: args.aboutme,
          phoneno: args.phonenumber,
          city: args.city,
          school: args.school,
          hometown: args.hometown,
          company: args.company,
          gender: args.gender
        };
        return axios
          .post("http://localhost:3001/travellersignup", data)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations
});
