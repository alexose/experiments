var express = require('express');
var app = express();
var portfinder = require('portfinder');
var log = require('npmlog');
var config = require('./config.js');
var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({ 
  host: config.elastic.host,
  log:  config.log
});

portfinder.getPort(function (err, port) {
  app.listen(port, function(){
    log.info('listening on port ' + port);  
  });
});

app.use(express.static('./client/'));
app.use('/about', express.static('../client'));
