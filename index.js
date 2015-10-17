'use strict';

const server = require('./lib/startup/server');
const unity = require('./lib/startup/unity')(server);

require('./lib/startup/mongoose')();
require('./lib/startup/router')(unity);
