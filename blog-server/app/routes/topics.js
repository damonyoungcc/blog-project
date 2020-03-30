const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/api/topics' });
const { authAdmin } = require('../controllers/users');
const { find, create, delete: del, findById } = require('../controllers/topics');
const { secret } = require('../config');

const auth = jwt({ secret });

router.post('/', auth, create); // 发帖
router.get('/', auth, find); // 查看所有帖子
router.get('/:id', auth, findById); // 根据id查看帖子详情
router.patch('/:id', auth, authAdmin, del); // 根据id删除帖子

module.exports = router;
