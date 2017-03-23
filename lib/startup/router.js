'use strict';

const fs = require('fs');
const logger = require('../services/logger');

module.exports = unity => {
  logger.info('Loading routes:');
  fs
    .readdirSync('lib/routes')
    .forEach(file => {
      if (file.substr(-3) !== '.js') return;
      require(`../routes/${file}`)(unity);
      logger.info(`- Loaded route for ${file.substr(0, file.length-3)}`);
    });
};
