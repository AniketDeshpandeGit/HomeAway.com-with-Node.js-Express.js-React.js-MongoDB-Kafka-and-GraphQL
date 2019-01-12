//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const math = require("mathjs");
var mysql = require("mysql");
var multer = require("multer");
const path = require("path");

var { mongoose } = require("./db/mongoose");
var autoIncrement = require("mongodb-autoincrement");
var kafka = require("./kafka/client");
var ObjectId = require("mongodb").ObjectID;

var { Login } = require("./models/login");
var { TLogin } = require("./models/traveller_signup");
var { Property } = require("./models/property");

//GraphQL
const expressGraphQL = require("express-graphql");
const schema = require("./schema");

app.set("view engine", "ejs");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

//GraphQL
console.log("using GraphQL");
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.post("/ownerlogin", (req, res) => {
  console.log("Owner Login");
  var username = req.body.username;
  var password = req.body.password;
  console.log("Username:", username + " password:", password);
  if (username === "admin" && password === "admin") {
    console.log("Match");
  }
  Login.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value =
          "The email and password you entered did not match our records. Please double-check and try again.";
        console.log(res.value);
        res.sendStatus(400).end();
      } else if (user && user.password == req.body.password) {
        // res.code = "200";
        // res.value = user;
        console.log("user result: " + user);
        res.json(user);
        // res.cookie("cookie", "admin", {
        //   maxAge: 900000,
        //   httpOnly: false,
        //   path: "/"
        // });
        // res.sendStatus(200).end();
      } else {
        console.log(user + " | " + user.password + " | " + req.body.password);
      }
    }
  );
});

app.post("/ownersignup", function(req, res) {
  console.log("Onwer SignUp");
  var username = req.body.username;
  var password = req.body.password;
  console.log("New Owner: ", req);

  Login.create(
    {
      username: req.body.name,
      password: req.body.password,
      phonenumber: req.body.phoneno,
      city: req.body.city,
      age: req.body.age
    },
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value = "User Cannot be Created";
        console.log(res.value);
        res.sendStatus(400).end();
      } else {
        // res.code = "200";
        // res.value = user;
        console.log("New user result: " + user);
        res.json(user);
        // res.cookie("cookie", "admin", {
        //   maxAge: 900000,
        //   httpOnly: false,
        //   path: "/"
        // });
        // res.sendStatus(200).end();
      }
    }
  );
});

app.post("/travellersignup", function(req, res) {
  console.log("Traveller SignUp");
  var username = req.body.username;
  var password = req.body.password;
  console.log("New Traveller: ", req);

  TLogin.create(
    {
      username: req.body.name,
      password: req.body.password,
      phonenumber: req.body.phoneno,
      aboutme: req.body.multiline,
      city: req.body.city,
      gender: req.body.gender,
      school: req.body.school,
      hometown: req.body.hometown,
      company: req.body.company,
      age: req.body.age
    },
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value = "Traveller Cannot be Created";
        console.log(res.value);
        res.sendStatus(400).end();
      } else {
        // res.code = "200";
        // res.value = user;
        console.log("New Traveller result: " + user);
        res.json(user);
        // res.cookie("cookie", "admin", {
        //   maxAge: 900000,
        //   httpOnly: false,
        //   path: "/"
        // });
        // res.sendStatus(200).end();
      }
    }
  );
});

app.post("/login", (req, res) => {
  console.log("Traveller Login");
  var username = req.body.username;
  var password = req.body.password;
  console.log("Username:", username + " password:", password);
  if (username === "admin" && password === "admin") {
    console.log("Match");
  }
  TLogin.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value =
          "The email and password you entered did not match our records. Please double-check and try again.";
        console.log(res.value);
        res.sendStatus(400).end();
      } else if (user && user.password == req.body.password) {
        // res.code = "200";
        // res.value = user;
        console.log("Traveller result: " + user);
        res.json(user);
        // res.cookie("cookie", "admin", {
        //   maxAge: 900000,
        //   httpOnly: false,
        //   path: "/"
        // });
        // res.sendStatus(200).end();
      } else {
        console.log(user + " | " + user.password + " | " + req.body.password);
      }
    }
  );
});

app.post("/addproperty", (req, res) => {
  console.log("Post Property");

  var dataObj = {
    ownerID: req.body.ownerkey,
    country: req.body.country,
    street_address: req.body.street_address,
    unit: req.body.unit,
    city: req.body.city,
    statelive: req.body.statelive,
    zipcode: req.body.zipcode,
    headline: req.body.headline,
    property_description: req.body.property_description,
    type_house: req.body.type_house,
    bedrooms: req.body.bedrooms,
    accomodates: req.body.accomodates,
    bathrooms: req.body.bathrooms,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    nightrate: req.body.nightrate,
    minimumstay: req.body.minimumstay
  };

  console.log("Req Body : ", dataObj);

  Property.create(dataObj, function(err, user) {
    if (err) {
      console.log(err);
      res.code = "400";
      res.value = "Property Cannot be Created";
      console.log(res.value);
      res.sendStatus(400).end();
    } else {
      // res.code = "200";
      // res.value = user;
      console.log("New Property result: " + user);
      res.json(user);
      // res.cookie("cookie", "admin", {
      //   maxAge: 900000,
      //   httpOnly: false,
      //   path: "/"
      // });
      // res.sendStatus(200).end();
    }
  });
});

app.get("/getownerproperty", function(req, res) {
  console.log("Inside Get owner property ");
  const data = JSON.parse(req.query.data);
  console.log(data);

  Property.find(
    {
      ownerID: data.ownerkey
    },
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value =
          "The email and password you entered did not match our records. Please double-check and try again.";
        console.log(res.value);
        res.sendStatus(400).end();
      } else {
        console.log("Property Results: " + user);
        res.json(user);
      }
    }
  );
});

app.get("/getproperty", function(req, res) {
  console.log("Inside Search Property");
  const data = req.query.data;
  console.log(data);
  const data1 = JSON.parse(data);
  var city = String(data1.search);
  console.log(city);

  Property.find(
    {
      city: data1.search
    },
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value = "Invalid Search Values";
        console.log(res.value);
        res.sendStatus(400).end();
      } else {
        console.log("Property Search Results: " + user);
        res.json(user);
      }
    }
  );
});

app.post("/bookproperty", function(req, res) {
  console.log("in bookproperty ");
  console.log("Req Body : ", req.body);
  var ownerIDCurrent;

  Property.find(
    {
      _id: req.body.propertykey
    },
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value = "Invalid Search Values";
        console.log(res.value);
        res.sendStatus(400).end();
      } else {
        console.log("Property Search Results: " + user);
        ownerIDCurrent = user;
        console.log("user: " + user);
        console.log("ownerIDCurrent" + user[0].ownerID);

        MongoClient.connect(
          "mongodb://localhost:27017/login_details",
          function(err, db) {
            if (err) throw err;
            var dbo = db.db("login_details");
            var myobj = {
              propertyID: req.body.propertykey,
              ownerID: user[0].ownerID,
              traverllerID: req.body.traverllerkey,
              headline: req.body.propertyHeadLine
            };
            dbo
              .collection("booking_table")
              .insertOne(myobj, function(err, user) {
                if (err) {
                  res.code = "400";
                  res.value = "Invalid Booking";
                  console.log(res.value);
                  res.sendStatus(400).end();
                } else {
                  console.log("Property Booking Results: " + user);
                  res.json(user);
                }
                console.log("1 document inserted");
                // var query = { username: username };
                // dbo.collection("login_details").find(query).toArray(function(err, result) {
                //     if (err) throw err;
                //     console.log(result[1].username);
                db.close();
              });
          }
        );
      }
    }
  );

  console.log("ownerIDCurrent Outside: " + ownerIDCurrent);
});

app.get("/getbookedproperty", function(req, res) {
  console.log("Inside owner property Login");
  const data = req.query.data;
  console.log(data);
  const data1 = JSON.parse(data);
  // var username=String(data1.username)
  // var password=String(data1.password)
  var travellerkey = String(data1.travellerkey);

  MongoClient.connect(
    "mongodb://localhost:27017/login_details",
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("login_details");
      var query = { traverllerID: data1.travellerkey };
      dbo
        .collection("booking_table")
        .find(query)
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result);
          //callback(null, result);
        });
    }
  );

  // MongoClient.connect(
  //   "mongodb://localhost:27017/login_details",
  //   function(err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("login_details");
  //     console.log("travellerkey: " + travellerkey);

  //     dbo.collection("booking_table").find(
  //       {
  //         traverllerID: data1.travellerkey
  //       },
  //       function(err, result) {
  //         if (err) {
  //           res.code = "400";
  //           res.value = "Invalid Booking";
  //           console.log(res.value);
  //           res.sendStatus(400).end();
  //         } else {
  //           console.log("Get Property of traveller Results: ");

  //           console.log("result" + result);
  //           console.log(result);
  //         }
  //         console.log("1 document inserted");
  //         // var query = { username: username };
  //         // dbo.collection("login_details").find(query).toArray(function(err, result) {
  //         //     if (err) throw err;
  //         //     console.log(result[1].username);
  //         db.close();
  //       }
  //     );
  //   }
  // );

  console.log("Hope");
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
