/* jshint laxbreak:true */

// Simple interface that allows better variable selection 
// TODO:  This should be written using React.
var Handlebars = require('handlebars');

module.exports = function(target, files, classname, editor){
  
  // Create box from template
  var template = Handlebars.compile(
      '<form class="{{classname}}">'
    + '  <select name="options" id="options">'
    + '  <option></option>'
    + '  {{#files}}'
    + '    <option value="{{name}}">{{name}}</option>'
    + '  {{/files}}'
    + '  <option value="" disabled="disabled">_________________________________</option>'
    + '  <option value="add-new"">Create a new template...</option>'
    + '  </select>'
    + '</form>'
  );

  var element = $(template({classname: classname, files : files})),
      ref;
  
  // Set up selection behavior
  element.change(change);
  
  function change(e){

    var value = $(this).find('select[name="options"]').val();

    template = files.filter(function(d){
      return d.name === value;
    }).pop();

    console.log($(this).find('select[name="options"]'), template);

    if (template && template.data){
      ref = template;
      editor.trumbowyg('html', template.data);
    }
  }

  // Update data
  editor.on('tbwchange', function(){
    if (ref && ref.data){
      var data = editor.trumbowyg('html'); 
      if (data.length > 1){
        ref.data = data; 
      }
    }
  });

  // Append to target 
  element.appendTo(target);
  
  change();
};
