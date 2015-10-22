/* jshint laxcomma:true */

var directory;
if (process.argv.length == 3){
  directory = process.argv[2];
} else {
  console.log('Usage: node template.js <directory>');
  process.exit();
}

var Handlebars = require('handlebars')
  , fs = require('fs');

// Scan directory for files and load everything besides index.html as a partial
walk(directory, function(path, stat) {

  // Get filename
  var arr = path.split('/').pop().split('.')
    , name = arr[0]
    , ext = arr[1];

  if (name !== 'index'){
    var str = fs.readFile(path);
    Handlebars.registerHelper(name, str);
    console.log('Loaded ' + name + ' as a partial');
  }
});

// Recursive directory scan helper function
function walk(current, callback){

  var local = require('path');

  fs.readdirSync(current).forEach(function(name){

    var path = local.join(current, name)
      , stat = fs.statSync(path);

    if (stat.isFile()) {
      callback(path, stat);
    } else if (stat.isDirectory()) {
      walk(path, callback);
    }
  });
}
