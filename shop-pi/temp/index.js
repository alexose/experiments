var sensor = require('ds18x20');
var request = require('superagent');

sensor.loadDriver(function (err) {

    // Take a reading every 60 seconds
    setInterval(function(){
        sensor.getAll(function (err, tempObj) {
            var str = '';
            for (var key in tempObj){
                var f = tempObj[key] * 9 / 5 + 32;
                str += 'temperature,thermometer=' + key + ' value=' + f + '\n';
            }
            request.post('http://localhost:8086/write')
                .query({
                    db: 'home'
                })
                .send(str)
                .end(function (err){
                     if (err){
                         console.log(err);
                     }
                });
        });
    }, 60 * 1000);
});
