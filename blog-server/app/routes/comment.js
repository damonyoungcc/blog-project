const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/api/comment' });
const { authAdmin } = require('../controllers/users');
const { create, find, createReplyComment } = require('../controllers/comment');
const { secret } = require('../config');

const auth = jwt({ secret });

// 评论帖子
router.post('/:id', create);
router.post('/:id/:commentId', createReplyComment)
router.get('/:id', find);

module.exports = router;
