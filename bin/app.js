/* jshint node: true, strict: true */

"use strict";

var url         = require('url'),
    http        = require('http'),
    WebSocket   = require('ws');



// Set up http server

var httpServer = module.exports = http.createServer();



// Set up socket proxy

var wsServer = new WebSocket.Server({
    server:  httpServer,
    path : '/api/v1/stream',
    disableHixie : true
});

wsServer.on('connection', function (client) {
    var uri = url.parse(client.upgradeReq.url, true),
        wsClient = new WebSocket('ws://realtime.nobil.no/api/v1/stream?apikey=' + uri.query.apikey);

    wsClient.on('open', function open() {
        console.log('connected to: ws://realtime.nobil.no/api/v1/stream?apikey=' + uri.query.apikey);
    });

    wsClient.on('message', function (data) {
        console.log('proxying message');
        client.send(data);
    });
});
