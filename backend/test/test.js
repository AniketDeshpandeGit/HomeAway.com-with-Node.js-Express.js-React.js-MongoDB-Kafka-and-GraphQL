var assert = require('assert');
var request = require('request');
var config = require('./config');


it('should login traveller', function(done) {
    request.post(config.host + ":3001/login", { form: { email: "owner@owner.com", password: "ownerpassword" } },
      function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
    });
  });

  it('should list properties', function(done) {
    request.get(config.host + ":3001/getownerproperty", { form: {  } },
      function (error, response, body) {
        assert.equal(500, response.statusCode);
        done();
    });
  });



  it('should upload a photo', function(done) {
    request.post(config.host + ":3001/photoupload", { form: {  } },
      function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
    });
  });


  it('should book a property successfully', function(done) {
    request.post(config.host + ":3001/addproperty", { form: {  } },
      function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
    });
  });


  it('should login owner', function(done) {
    request.post(config.host + ":3001/ownerlogin", { form: { email: "user@user.com ", password: "userpassword" } },
      function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
    });
  });
