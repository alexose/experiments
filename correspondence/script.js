// This script requires watchify!
// Install via "npm install -g watchify"
//
// To monitor this file for changes and rebuild automatically, type:
// watchify -v -t brfs script.js -o assets/js/script.js

var fs = require('fs');
var $ = require('jquery');
var Handlebars = require('handlebars');

// Set up drawer
var drawer = $('#drawer'),
    main = $('#main'),
    handle = drawer.find('.handle');

handle.click(function(){
  var classname = 'expanded';
  drawer
    .toggleClass(classname)
    .animate({ height : drawer.hasClass(classname) ? 400 : 30 });

  main
    .animate({ bottom : drawer.hasClass(classname) ? 400 : 30 });
});

// Start ACE editor
var ace = require('brace');
require('brace/mode/handlebars');
require('brace/mode/json');

var code = ace.edit('left'),
    cses = code.getSession();

code.setShowPrintMargin(false);
cses.setMode('ace/mode/handlebars');
cses.setValue(
  fs.readFileSync(__dirname + '/example.html', 'utf8')
);
cses.on('change', update);

var data = ace.edit('data'),
    dses = data.getSession();

data.setShowPrintMargin(false);
dses.setMode('ace/mode/json');
dses.setValue(
  fs.readFileSync(__dirname + '/data.json', 'utf8')
);
dses.on('change', update);

function update(evt, session){

  var str = cses.getValue(), 
      json = dses.getValue(),
      obj;

  try {
    obj = JSON.parse(json);
  } catch(e){
    console.log('oh no!');
    return;
  }

  // Compile and display
  var result;

  try {
    var template = Handlebars.compile(str);
    result = template(obj);
  } catch(e){
    result = '<div class="usa-alert usa-alert-error" role="alert"><div class="usa-alert-body"><h3 class="usa-alert-heading">Error:</h3> <p class="usa-alert-text">' + e.toString() + '</p></div></div>';
  }

  $('#right').html(result);
}
update();
