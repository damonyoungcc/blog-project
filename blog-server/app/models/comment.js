const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    __v: { type: Number, select: false },
    topicId: { type: String, required: true }, // 评论的帖子id
    commentator: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 评论人
    content: { type: String, required: true }, // 评论内容
    replyTo: { type: Schema.Types.ObjectId, ref: 'User', required: false }, // 如果是回复评论
    rootCommentId: { type: String }, // 如果是回复评论，一级评论的根id
  },
  { timestamps: true },
);

module.exports = model('Comment', commentSchema);
