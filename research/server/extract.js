var tika = require('tika');
var log = require('npmlog');

module.exports = function(path, mimetype, callback){

  var options = { contentType : mimetype };

  log.info('File uploaded.  Detecting content type...');
  tika.type(path, function(err, contentType){

    log.info('Parsing text...');
    tika.text(path, options, function(err, text){
      callback(text, type);
    });
  });
}
