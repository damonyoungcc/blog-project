const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    __v: { type: Number, select: false },
    content: { type: String, required: true },
    commentator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topicId: {type: String, required: true }
    replyTo: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true },
);

module.exports = model('User', commentSchema);
