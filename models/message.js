const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, required: true, maxLength: 30 },
  message: { type: String, required: true, maxLength: 500 },
  date: { type: Date, required: true },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Message', messageSchema);
