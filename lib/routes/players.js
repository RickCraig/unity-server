'use strict';

const mongoose = require('mongoose'),
  logger = require('../services/logger');

module.exports = (unity) => {

  const Player = mongoose.model('Player');

  // Create Player
  unity.router.command('p', (req, res) => {
    logger.info(`Updating/Inserting Player: ${req.arguments[0]}`);

    const query = {
      uid: req.arguments[0]
    };

    const doc = {
      uid: req.arguments[0]
    };

    if (req.arguments[1]) doc.name = req.arguments[1];
    if (req.arguments[2]) doc.status = req.arguments[2];

    Player.update(query, doc, { upsert: true }, err => {
      if (err) return res.json(0);
      logger.info('Player created successfully');
      res.send(1);
    });
  });

};
