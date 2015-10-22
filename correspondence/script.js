// This script requires browserify!
//
// To build it, just type:
// browserify -t brfs script.js > assets/js/script.js

var fs = require('fs');
var $ = require('jquery');
var Handlebars = require('handlebars');

// Start ACE editor
var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var code = ace.edit('left').getSession();

code.setMode('ace/mode/html')
code.setValue(
  fs.readFileSync(__dirname + '/example.html', 'utf8')
);

var data = ace.edit('data').getSession();

data.setMode('ace/mode/json')
data.setValue(
  fs.readFileSync(__dirname + '/data.json', 'utf8')
);
