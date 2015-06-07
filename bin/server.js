/* jshint node: true, strict: true */

"use strict";

var server  = require('./app.js');



// Start application

server.listen(process.env.PORT || 9999, function () {
    console.log('Proxy running at http://localhost:' + server.address().port + '/');
    console.log('server process has pid ' + process.pid);
});



// Catch uncaught exceptions, log it and take down server in a nice way.

process.on('uncaughtException', function (err) {
    console.error('shutdown - server taken down by force due to a uncaughtException');
    console.error(err.message);
    console.error(err.stack);
    process.nextTick(function () {
        process.exit(1);
    });
});



// Listen for SIGINT (Ctrl+C) and do a gracefull takedown of the server

process.on('SIGINT', function () {
    console.log('shutdown - got SIGINT - taking down server gracefully');
    process.nextTick(function () {
        process.exit(0);
    });
});



// Listen for SIGTERM (Upstart) and do a gracefull takedown of the server

process.on('SIGTERM', function () {
    console.log('shutdown - got SIGTERM - taking down server gracefully');
    process.nextTick(function () {
        process.exit(0);
    });
});
