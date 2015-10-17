'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var player = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, index: true },
  position: {
    x: Number,
    y: Number,
    z: Number
  },
  status: String,
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Player' }]
});

module.exports.model = mongoose.model('Player', player);
