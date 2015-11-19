// This script requires watchify!
// Install via "npm install -g watchify"
//
// To monitor this file for changes and rebuild automatically, type:
// watchify -v -t brfs script.js -o assets/js/script.js

var fs = require('fs');
var Handlebars = require('handlebars');

// Set up drawer
var drawer = $('#drawer'),
    main = $('#main'),
    handle = drawer.find('.handle');

handle.click(function(){
  var classname = 'expanded';
  drawer
    .toggleClass(classname)
    .animate({ height : drawer.hasClass(classname) ? 300 : 30 });

  main
    .animate({ bottom : drawer.hasClass(classname) ? 300 : 30 });
});


var ace = require('brace');
require('brace/mode/json');

CKEDITOR.config.skin = 'office2013';
var editor = CKEDITOR.replace('editor');

// Resize editor window to fit div
CKEDITOR.on('instanceReady', resize); 

editor.on('contentDom', function(){
  var editable = editor.editable();
  // editor.on('doubleclick', handler);
});

$(window).on('resize', resize); 

function resize() {
    editor.element.show();
    var h = $('#left').height();
    editor.element.hide();
    editor.resize('100%', h - 123, true);
}


editor.on('change', update);

// Set up tag editor interface
var tagPicker = require('./tag.js');

// Set up menu interface
var list = require('./list.js'),
    target = $('#menu'),
    menu = require('./menu.js');

menu(target, list.templates, 'templates', editor);
menu(target, list.partials, 'partials', editor);

$('body').on('switch-template', update);

// via http://stackoverflow.com/questions/20889174
var handler = function(e){

  var pos = editor.getSelection().getRanges()[0];
  console.log(pos);

  tagPicker(e, '', obj, function(result){
    console.log(result);
  });
};

$('#left').on("click", handler);

var data = ace.edit('data'),
    dses = data.getSession();

data.setShowPrintMargin(false);
dses.setMode('ace/mode/json');
dses.setValue(
  fs.readFileSync(__dirname + '/data.json', 'utf8')
);
dses.on('change', update);

// Select demo template
target.find('select:eq(0) option:eq(1)').prop('selected', 'selected').trigger('change');

var obj;
function update(evt, session){

  var str = editor.getData(),
      json = dses.getValue();

  try {
    obj = JSON.parse(json);
  } catch(e){
    console.log('oh no!');
    return;
  }

  // Compile and display
  var result;

  try {
    var find = '{{\&gt\;';
    var re = new RegExp(find, 'g');
    str = str.replace(re, '{{>');

    // console.log(str);

    var template = Handlebars.compile(str);
    result = template(obj);

    // Reregister partials
    list.partials.forEach(function(d){
      Handlebars.unregisterPartial(d.name);
      Handlebars.registerPartial(d.name, d.data);
    });

  } catch(e){
    result = '<div class="usa-alert usa-alert-error" role="alert"><div class="usa-alert-body"><h3 class="usa-alert-heading">Error:</h3> <p class="usa-alert-text">' + e.toString() + '</p></div></div>';
  }

  $('#right').html(result);
}
update();
