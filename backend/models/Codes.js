const mongoose = require('mongoose');

const CodesSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lang: {
    type: String,
    required: true,
    enum: ['python', 'javascript', 'java', 'c++', 'c#', 'ruby', 'go', 'php'],
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Unique index on userId + code
CodesSchema.index({ userId: 1, code: 1 }, { unique: true });

const Codes = mongoose.model('Codes', CodesSchema);

module.exports = Codes;
