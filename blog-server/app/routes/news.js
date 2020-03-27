const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/api/news' });
const { authAdmin } = require('../controllers/users');
const { find, create, update, findById } = require('../controllers/news');
const { secret } = require('../config');

const auth = jwt({ secret });

// 只有管理员权限才可以增加新闻
router.post('/', auth, authAdmin, create); // 新增新闻
router.get('/', auth, find); // 根据新闻类型查询所有新闻
router.get('/:id', auth, findById);
router.patch('/:id', auth, authAdmin, update); // 根据id更新新闻

module.exports = router;
