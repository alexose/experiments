// This script requires browserify!
//
// To build it, just type:
// browserify -t brfs script.js > assets/js/script.js

var $ = require('jquery');
var Handlebars = require('handlebars');

// Start ACE editor
var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var code = ace.edit('left');
code.getSession().setMode('ace/mode/html');
// editor.setTheme('ace/theme/monokai');

var data = ace.edit('data');
data.getSession().setMode('ace/mode/json');

// Load example template
var fs = require('fs');
var example = fs.readFileSync(__dirname + '/example.html', 'utf8');

code.session.setValue(example);
