/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
module.paths.push(__dirname + '/node_modules');

var ipc = require('ipc'),
    jQuery = require('jquery');

ipc.send('new-links', $('a').length);

