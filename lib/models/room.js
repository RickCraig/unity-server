'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const room = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, index: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  game: {
    started: { type: Boolean, default: false },
    ended: { type: Boolean, default: false }
  }
});

mongoose.model('Room', room);
