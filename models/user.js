const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: { type: String, required: true, maxLength: 30 },
  username: { type: String, required: true, maxLength: 30 },
  password: { type: String, required: true },
  membership: {
    type: String,
    required: true,
    enum: ['member', 'club-member'],
  },
  admin: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', userSchema);
