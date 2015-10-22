// This script requires browserify!
//
// To build it, just type:
// browserify script.js

var $ = require('jquery');
var Handlebars = require('handlebars');

// Start ACE editor
var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var code = ace.edit('left');
code.getSession().setMode('ace/mode/javascript');
// editor.setTheme('ace/theme/monokai');

var data = ace.edit('data');
data.getSession().setMode('ace/mode/json');
