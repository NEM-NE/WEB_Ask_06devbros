const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  comment: {
      String,
      required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Comment', commentSchema);
