const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/api/comment' });
const { authAdmin } = require('../controllers/users');
const {
  create,
  findById,
  createReplyComment,
  findReplyByCommentatorId,
} = require('../controllers/comment');
const { secret } = require('../config');

const auth = jwt({ secret });

// 评论
router.post('/:topicId', auth, create); //根据帖子id评论帖子
// router.post('/:topicId/:rootCommentId', auth, createReplyComment); // 根据帖子id和回复人id，回复评论
router.get('/:topicId', auth, findById); // 根据帖子id查询所有帖子一级评论
router.get('/:topicId/:rootCommentId', auth, findReplyByCommentatorId);

module.exports = router;
