var express       = require('express');
var app           = express();
var portfinder    = require('portfinder');
var log           = require('npmlog');
var multer        = require('multer')
var upload        = multer({ dest: 'uploads/' })
var config        = require('../config.js');
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({ 
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

// Because the client communicates directly with elastic, the API is
// only needed to handle uploads.  Therefore, we just have two routes:
app.post('/api/report', upload.single('file'), upsert); 
app.post('/api/report/:id', upload.single('file'), upsert);

// Handle incoming file and response
function upsert(req, res){

  var fields = req.body,
      params = req.params,
      file = req.file;

  save(file, fields, function(err){
    if (!err){
      res.status(204).end()
    } else {
      res.status(500).end()
    }
  });
} 

// Save file to ElasticSearch
function save(file, fields, callback){
  client.create({
      index: 'reports',
      type:  file.mimetype, //TODO: is this correct?
      body:  file,
  }, function(err, result){
    callback(err);
  });  
}
