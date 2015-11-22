var Utils = require('./utils.js');

var Model = function(key){
  this.id = 0;
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

Model.prototype.addItem = function(name, type){
  this.items = this.items.concat({
    "id":   this.id++,
    "name": name,
    "type": type 
  });

  this.inform();
};

module.exports = Model;

