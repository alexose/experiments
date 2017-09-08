var compression   = require('compression');
var express       = require('express');
var app           = express();
var fs            = require('fs');
var proxy         = require('express-http-proxy');
var portfinder    = require('portfinder');
var log           = require('npmlog');
var multer        = require('multer')
var elasticsearch = require('elasticsearch');
var extract       = require('./extract.js');
var config        = require('../config.js');
var upload        = multer({ dest: 'uploads/' });

var client = new elasticsearch.Client({ 
  host: config.elastic.host,
  log:  config.log
});

portfinder.getPort(function (err, port) {
  app.listen(port, function(){
    log.info('listening on port ' + port);  
  });
});

app.use(compression());
app.use(express.static('./client/', { maxAge : 1000 * 60 * 60 * 24 }));

// TODO: use s3 for this
app.get('/files/:id', function(req, res){
  var id = req.params.id;
  fs.readFile('./uploads/' + id, function(err, data){

    if (!err && data.length){

      client.get({ index : 'reports', type : 'document', id : id }, function(err, result){
        if (!err && result._source){

          var filename = result._source.title,
              mimetype = result._source.mimetype;

          res.set({
            "Content-Disposition": 'attachment; filename="' + filename + '"',
            "Content-Type": mimetype,
            "Content-Length": data.length
          });

          res.send(data);
        } else {
          res.status(404);
        }
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

// Proxy elastic requests from client
app.use('/api/elastic', proxy(config.elastic.host, {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

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
  extract(file.path, file.mimetype, function(body, mimetype){
    
    var obj = {
      index:       'reports',
      type:        'document',
      id:          file.filename,
      body: {
        title:    fields.title,
        mimetype: mimetype,
        size:     file.size,
        body:     body,
        owner:    fields.owner,
        email:    fields.email,
        agency:   fields.agency
      }
    };
    
    client.create(obj, function(err, result){
      callback(err);
    }); 
  });
}
