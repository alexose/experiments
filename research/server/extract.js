var tika = require('tika');

module.exports = function(path, mimetype, callback){

  var options = { contentType : mimetype };

  tika.text(path, options, function(err, text) {
    callback(text);
  });
}
