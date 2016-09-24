var express = require('express');
var configs = require('./config');


var app = express();


var port = process.env.PORT || configs.services.PORT;




app.listen(port, function () {
  console.log('Agriculture Mobile Service API running at ' + port + ' port!');
});