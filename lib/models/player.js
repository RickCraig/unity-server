'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var player = new Schema({
  createdAt: { type: Date, default: Date.now },
  uid: String,
  name: { type: String, index: true },
  status: String,
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Player' }]
});

mongoose.model('Player', player);
