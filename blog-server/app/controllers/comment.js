const jsonwebtoken = require('jsonwebtoken');
const Comment = require('../models/comment');
const { secret } = require('../config');

class CommentCtl {
  // 新增一级评论
  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
      rootCommentId: { type: 'string', required: false },
      replyTo: { type: 'string', required: false },
    });
    const commentator = ctx.state.user._id;
    const { topicId } = ctx.params;
    const comment = await new Comment({
      ...ctx.request.body,
      commentator,
      topicId,
    }).save();
    ctx.body = comment;
  }
  async findById(ctx) {
    const { topicId } = ctx.params;
    const comments = await Comment.find({ topicId, rootCommentId: null }).populate(
      'commentator replyTo',
    );
    ctx.body = comments;
  }
  async findReplyByCommentatorId(ctx) {
    const { topicId, rootCommentId } = ctx.params;
    const comments = await Comment.find({ topicId, rootCommentId }).populate('commentator replyTo');
    ctx.body = comments;
  }
}

module.exports = new CommentCtl();
