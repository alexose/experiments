/* jshint laxbreak:true */

// Simple interface that allows better variable selection 
// TODO:  This should be written using React.
var Handlebars = require('handlebars'),
    $ = require('jquery');

module.exports = function(e, token, json, callback){
  
  // Create box from template
  var template = Handlebars.compile(
      '<div class="tag-picker">'
    + '  <form class="usa-search usa-search-small">'
    + '    <div role="search">'
    + '      <label class="usa-sr-only" for="search-field-small">Search small</label>'
    + '      <input id="search-field-small" type="search" name="search">'
    + '      <button type="submit">'
    + '        <span class="usa-sr-only">Search</span>'
    + '      </button>'
    + '    </div>'
    + '  </form>'
    + '  <div class="tag-picker-results"></div>'
    + '</div>'
  );

  var element = $(template()),
      keypaths = generate(token, json);
  
  // Place box at appropriate coordinates
  element.css({
      position: 'absolute',
      'z-index': 1001,
      left : e.clientX,
      top : e.clientY
    });

  // Set up search behavior
  var input = element.find('input[name="search"]');
  input.keydown(function(){
    var results = search(input.val(), keypaths);
    draw(target, results);
  });

  // Set up list
  var target = element.find('.tag-picker-results');
  draw(target, generate(token, json));

  // Handle clicks
  target.click(function(e){
    var val = $(e.target).text();
    callback(val);
    close();
  });

  // Append to screen
  element.appendTo('body');
  
  // Handle clickoff
  element.click(stop);
  stop(e);

  $('body').one('click.tagpicker', close);
  
  function stop(e){
    e.stopPropagation();
  }

  function close(){
    element.remove(); 
  }
};


// Redraw results
function draw(target, keypaths){
  
  var template = Handlebars.compile(
      '<ul>'
    + '  {{#keypaths}}'
    + '    <li>{{.}}</li>'
    + '  {{/keypaths}}'
    + '</ul>'
  );

  var ul = template({ keypaths : keypaths });
  target.empty().append(ul);
}

function search(term, arr){
  var results = [];
  for (var i in arr){
    var keypath = arr[i];
    if (keypath.indexOf(term) !== -1){
      results.push(keypath); 
    }
  }
  return results;
}

function generate(token, json){

  // Generate a list of all possible keypaths
  var keypaths = [];

  (function generate(data, path, level){
    for (var key in data){
      var current = path ? path + '.' + key : key,
          value = data[key];

      if (typeof value === 'object'){
        generate(value, current, level+1);
      } else {
        keypaths.push(current);
      }
    }
  })(json, false, 0);

  return keypaths;
}
