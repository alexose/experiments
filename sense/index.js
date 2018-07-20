const sieve = require('sievejs');
const WebSocket = require('ws');

sieve({
    url: 'https://api.sense.com/apiservice/api/v1/authenticate',
    type: 'POST',
    form: require('./credentials')
  }, load);

function load(json){
  const { monitors, access_token } = JSON.parse(json);
  
  // Only use first monitor for now
  const id = monitors[0].id;
  const ws = new WebSocket(
    `wss://clientrt.sense.com/monitors/${id}/realtimefeed?access_token=${access_token}`
  );
  
  ws.on('message', data => console.log(data)); 
}
