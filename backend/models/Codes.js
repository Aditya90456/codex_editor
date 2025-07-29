const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  lang: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Code', codeSchema);
