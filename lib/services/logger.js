'use strict';

const winston = require('winston');

// Create the console logger
const cLogger = new (winston.transports.Console)({
  level: 'info',
  colorize: true,
  prettyPrint: true
});

module.exports = new (winston.Logger)({
  transports: [cLogger]
});
