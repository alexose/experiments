/* jshint laxbreak:true, laxcomma:true */
var url;
if (process.argv.length == 3){
  url = process.argv[2];
} else {
  console.log('Usage: electron crawl.js url');
  process.exit();
}

var BrowserWindow = require('browser-window')
  , app = require('app')
  , ipc = require('ipc')
  , fs = require('fs')
  , win = null
  , web = null;
  
var jQuery = fs.readFileSync('./node_modules/jquery/dist/jquery.min.js', 'utf8')
  , peek = fs.readFileSync('./peek.js', 'utf8');

// IPC
ipc.on('new-links', function(event, arr){
  console.log(arr);
});

// Login page
app.on('ready', function(){
  win = new BrowserWindow({ width: 800, height: 600, show: true, 'node-integration': true });
  web = win.webContents;
  win.loadUrl(url);

  web.send('peek');

  web.once('did-finish-load', function(){
    crawl();
  });
});

function crawl(){

  console.log('what');

  // Retrieve urls
  web.executeJavaScript(peek);
}
