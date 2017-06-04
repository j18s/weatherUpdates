var express = require('express');
var router = express.Router();
var cors = require('cors')
var request = require('request');
var helper = require('../helper/helper.js');
var config = require('../config/config.js');
var configData = config.getConfig();
process.env.PORT = helper.findKeyValue(configData, 'port');
var base_url = helper.findKeyValue(configData, 'baseurl') + ':' + process.env.PORT;

router.use(cors());

router.get('/weatherForecast', function (req, res, next) {
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
