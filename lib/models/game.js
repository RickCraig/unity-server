'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var game = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, index: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  hasStarted: { type: Boolean, default: false },
  hasEnded: { type: Boolean, default: false },
  meta: Schema.Types.Mixed
});

module.exports.model = mongoose.model('Game', game);
