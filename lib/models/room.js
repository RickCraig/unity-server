'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var room = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, index: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  game: { type: Schema.Types.ObjectId, ref: 'Game' }
});

module.exports.model = mongoose.model('Room', room);
