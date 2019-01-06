const sieve = require('sievejs');

exports.handler = (event, context, callback) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(event)
    };
    sieve(event.request, (result) => callback(null, result))
    callback(null, response);
};
