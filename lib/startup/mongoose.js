const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../services/logger');
const fs = require('fs');

module.exports = () => {
  'use strict';

  logger.info('Loading database models:');
  fs
    .readdirSync('lib/models')
    .forEach(file => {
      if (file.substr(-3) !== '.js') return;
      require(`../models/${file}`);
      logger.info(`- Loaded model for ${file.substr(0, file.length-3)}`);
    });

  mongoose
    .connect(`${config.base.url}${config.name}`, () => {
      logger.info(`Connected to MongoDB: ${config.base.url}${config.name}`);
    });
};
