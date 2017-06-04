var express = require('express');
var router = express.Router();
var request = require('request');
var helper = require('../helper/helper.js');
var config = require('../config/config.js');

var configData = config.getConfig();
process.env.PORT = helper.findKeyValue(configData, 'port');
var base_url = helper.findKeyValue(configData, 'baseurl') + ':' + process.env.PORT;

//console.log(base_url);
/* GET home page. */

router.get('/', function (req, res, next) {
  request.get(base_url + '/weatherForecast', function (err, response, body) {
    let weather = body;
    weather = JSON.parse(body);
    let output = helper.getDates(weather);
    let result = { plotdata: output, title: weather.city.name, datetime: new Date(), unit: "Celsius" };
    res.status = 200;
    res.render('index', result);
  })
});

router.get('/weatherForecast', function (req, res, next) {
  //console.log(configData);
  let url = helper.findKeyValue(configData, 'weatherApi') +
    helper.findKeyValue(configData, 'city') + '&appid=' +
    helper.findKeyValue(configData, 'appid') + '&units=' +
    helper.findKeyValue(configData, 'unit');

  request.get(url, function (error, response, body) {
    res.setHeader('Content-Type', 'application/json');
    body = JSON.parse(body);
    res.json(body);
  });
});
module.exports = router;
