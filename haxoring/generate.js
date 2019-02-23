var fs = require('fs');
var arr = [];
for(i=4050; i<5050; i++){
  arr.push({ char: String.fromCharCode(i) });
}

let data = JSON.stringify(arr);
fs.writeFileSync('output.json', data);
