const mongoose = require('mongoose'); 
const { p } = require('motion/react-client');

const problemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
  title: { type: String, required: true },  
  solved: { type: Boolean, default: false },
  attempted: { type: Boolean, default: false },
  tags: [String],
  link: String
});

problemSchema.index({ userId: 1, title: "" }, { unique: true });  

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
