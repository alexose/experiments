// This script requires browserify!
//
// To build it, just type:
// browserify -t brfs script.js > assets/js/script.js

var fs = require('fs');
var $ = require('jquery');
var Handlebars = require('handlebars');

// Start ACE editor
var ace = require('brace');
require('brace/mode/html');
require('brace/mode/json');

var code = ace.edit('left');
code.setShowPrintMargin(false);
code.getSession().setMode('ace/mode/html');
code.getSession().setValue(
  fs.readFileSync(__dirname + '/example.html', 'utf8')
);

var data = ace.edit('data');
data.setShowPrintMargin(false);
data.getSession().setMode('ace/mode/json');
data.getSession().setValue(
  fs.readFileSync(__dirname + '/data.json', 'utf8')
);
