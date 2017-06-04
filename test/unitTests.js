var nock = require('nock');
var request = require('supertest')("http://localhost:3000");
var expect = require('chai').expect;
//used to read the JSON file
var fs = require("fs");
var helper = require('../helper/helper.js');

describe("Testing utilities", function () {
  var contents = helper.getFileDetails('./json/test.json');
  it("whether config file exists", function (done) {
    expect(contents.toString().length).to.be.above(0);
    done();
  });

  it("find key value in config file", function (done) {
    let port = helper.findKeyValue(contents, 'port');
    expect(port).to.be.equal(3000);
    done();
  });
})
describe("Testing API with a mocked backend", function () {
  //read the json file
  const contents = fs.readFileSync('./json/forecast.json');
  //parse the contents and assign to a variable
  const jsonContent = JSON.parse(contents);
  it("responds with forecast json file response", function (done) {
    nock("http://localhost:3000")
      .get('/weatherForecast')
      .reply(200, jsonContent);

    request
      .get('/weatherForecast')
      .expect(200)
      .end(function (err, res) {
        expect(res.body.status).to.equal(200);
        //expect(res.body.result.postcode).to.equal("SW1A 1AA")
        done();
      });
  })

  it("find dates in forecast data", function (done) {
    let output = helper.getDates(jsonContent.result);
    done();
  });
});