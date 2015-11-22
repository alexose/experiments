var Utils = require('./utils.js');

var Model = function(key){
  this.key = key;
  this.items = Utils.store(key);
  this.onChanges = [];
};

Model.prototype.subscribe = function(cb){
  this.onChanges.push(onChange);
};

Model.prototype.inform = function () {
  Utils.store(this.key, this.todos);
  this.onChanges.forEach(function (cb) { cb(); });
};

Model.prototype.addItem = function (title){
  this.todos = this.todos.concat({
    id: Utils.uuid(),
    title: title,
    completed: false
  });

  this.inform();
};

module.exports = Model;

