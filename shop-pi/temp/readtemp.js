var sensor = require('ds18x20');
var logger = require('fluent-logger');

logger.configure('fluentd.test', {
  host: 'localhost',
  port: 24224,
  timeout: 3.0,
  reconnectInterval: 600000 // 10 minutes
});

sensor.loadDriver(function (err) {
    console.log(err);
    sensor.getAll(function (err, tempObj) {
    console.log(err);
	for (var key in tempObj){
            var f = tempObj[key] * 9 / 5 + 32;
	    console.log(f);
	}
    });
});
