'use strict';

const net = require('net'),
  logger = require('../services/logger'),
  config = require('../config');

const server = net.createServer({allowHalfOpen: false});


server.listen(config.port, () => {
  console.log('Server Bound');
});

function onError(error) {
  logger.error('An error occurred: ', error);
}

function onListening() {
  logger.info('Server started listening');
}

server.on('error', onError);
server.on('listening', onListening);

module.exports = server;
