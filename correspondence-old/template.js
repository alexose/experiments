/* jshint laxcomma:true */

module.exports = function(directory, obj){

  var Handlebars = require('handlebars')
    , fs = require('fs')
    , local = require('path')
    , main;

  // Scan directory for files and load everything besides index.html as a partial
  var files = fs.readdirSync(directory);

  files.forEach(function(path){
    
    // Get filename
    var arr = path.split('/').pop().split('.')
      , name = arr[0]
      , ext = arr[1];
      
    // Read file
    var str = fs.readFileSync(local.join(directory, path), 'utf-8');

    if (name == 'index'){
      main = Handlebars.compile(str);
    } else {
      Handlebars.registerPartial(name, str);
      // console.log('Loaded ' + name + ' as a partial');
    } 
  });

  // Render template
  return main(obj);
};
