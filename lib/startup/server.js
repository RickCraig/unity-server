'use strict';

const net = require('net');
const server = net.createServer({allowHalfOpen: false});

server.listen(8888, () => {
  console.log('Server Bound');
});

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {

}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log(`Server started: ${bind}`);
}

module.exports = server;
