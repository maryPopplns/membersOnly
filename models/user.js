const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: { type: String, required: true, maxLength: 20 },
  username: { type: String, required: true, maxLength: 20 },
  password: { type: String, required: true, maxLength: 20 },
  membership: {
    type: String,
    required: true,
    maxLength: 20,
    enum: ['member', 'club-member'],
  },
  admin: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', userSchema);
