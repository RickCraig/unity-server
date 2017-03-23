const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../services/logger');
const fs = require('fs');

module.exports = () => {
  'use strict';

  mongoose
    .connect(`${config.base.db}${config.name}`, () => {
      logger.info(`Connected to MongoDB: ${config.base.db}${config.name}`);
    });

  logger.info('Loading database models:');
  fs
    .readdirSync('lib/models')
    .forEach(file => {
      if (file.substr(-3) !== '.js') return;
      require(`../models/${file}`);
      logger.info(`- Loaded model for ${file.substr(0, file.length-3)}`);
    });
};
