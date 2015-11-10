/* jshint laxbreak:true */

// Simple interface that allows better variable selection 
// TODO:  This should be written using React.
var Handlebars = require('handlebars'),
    $ = require('jquery');

module.exports = function(target, files){
  
  // Create box from template
  var template = Handlebars.compile(
      '<form>'
    + '  <select name="options" id="options">'
    + '  {{#files}}'
    + '    <option value="{{name}}">{{name}}</option>'
    + '  {{/files}}'
    + '  <option value="" disabled="disabled">_________________________________</option>'
    + '  <option value="add-new"">Create a new template...</option>'
    + '  </select>'
    + '</form>'
  );

  var element = $(template({files : files}));
  
  // Set up selection behavior
  element.change(change);
  
  function change(e){
    var value = $(this).find('select[name="options"]').val();
    console.log(value);
  };

  // Append to target 
  element.appendTo(target);
  
  change();
};
