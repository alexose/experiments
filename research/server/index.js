var express = require('express');
var app = express();
var portfinder = require('portfinder');
var log = require('npmlog');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

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
  callback();
}
