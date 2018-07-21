const sieve = require('sievejs');
const WebSocket = require('ws');
const config = require('./config');

sieve({
    url: 'https://api.sense.com/apiservice/api/v1/authenticate',
    type: 'POST',
    form: config.credentials; 
  }, load);

function load(json){
  const { monitors, access_token } = JSON.parse(json);
  
  // Only use first monitor for now
  const id = monitors[0].id;
  const ws = new WebSocket(
    `wss://clientrt.sense.com/monitors/${id}/realtimefeed?access_token=${access_token}`
  );
  
  ws.on('message', str => {
    const data = JSON.parse(str);
    if (data.type === 'realtime_update'){
      record(data);
    }
  }); 
}

function record(data){
  sieve({
    url: config.influxdb.url,
    type: 'POST',
    data: format(data)
  });
}

// Convert raw JSON to InfluxDB
function format(data){
  const { devices } = data.payload;
  let str = '';
  devices.forEach(d => {
    str += `device,name=${d.name},id=${d.id},watts=${d.w},count=${d.c} ${+new Date()}${'\n'}`
  });
  return str;
}
