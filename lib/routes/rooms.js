'use strict';

const mongoose = require('mongoose'),
  logger = require('../services/logger');

module.exports = (unity) => {

  const Room = mongoose.model('Room');
  const Player = mongoose.model('Player');

  unity.router.command('rs', (req, res) => {
    logger.info('Getting Room List');

    Room
      .find({})
      .exec()
      .then(rooms => {
        logger.info(`${rooms.length} rooms found.`);

        if (!rooms || rooms.length < 1) return res.send(0);

        rooms = rooms.map(room => {
          return {
            id: room.id,
            n: room.name,
            p: room.players,
            g: {
              s: room.game.started ? 1 : 0,
              e: room.game.ended ? 1 : 0
            }
          };
        });

        res.json(rooms);
      }, err => {
        logger.error('Error retrieving rooms', err);
        res.send(0);
      });
  });

  unity.router.command('r', (req, res) => {
    logger.info(`Updating/Inserting Room: ${req.arguments[0]}`);

    const doc = { name: req.arguments[0] };

    Room.update(doc, doc, { upsert: true }, err => {
      if (err) return res.json(0);
      logger.info('Room created successfully');
      res.send(1);
    });
  });

  // Join Room
  unity.router.command('jr', (req, res) => {
    logger.info(`${req.arguments[0]} joining room ${req.arguments[1]}`);

    if (!req.arguments || req.arguments.length < 2) {
      logger.error('The user id and room id are both required');
      return res.send(0);
    }

    Player.findOne({ uid: req.arguments[0] })
      .exec() 
      .then(player => {
        player.room = req.arguments[1];
        return player.save();
      })
      .then(() => {
        return Room
          .findById(req.arguments[1])
          .exec();
      })
      .then(room => {
        room.players.push(req.arguments[0]);
        return room.save();
      })
      .then(() => {
        res.send(1);
      });
  });

  // Leave Room
  unity.router.command('lr', (req, res) => {
    logger.info(`${req.arguments[0]} leaving room ${req.arguments[1]}`);

    if (!req.arguments || req.arguments.length < 2) {
      logger.error('The user id and room id are both required');
      return res.send(0);
    }

    Player.findOne({ uid: req.arguments[0] })
      .exec()
      .then(player => {
        player.room = null;
        return player.save();
      })
      .then(() => {
        return Room
          .findById(req.arguments[1])
          .exec();
      })
      .then(room => {
        room.players.filter(player => player !== req.arguments[0]);
        return room.save();
      })
      .then(() => {
        res.send(1);
      });
  });

};
