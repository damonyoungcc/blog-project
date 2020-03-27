const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/api/type' });
const { authAdmin } = require('../controllers/users');
const { find, create, update } = require('../controllers/type');
const { secret } = require('../config');

const auth = jwt({ secret });

// 只有管理员权限才可以增加新闻分类
router.post('/', auth, authAdmin, create); // 新增新闻分类
router.get('/', auth, find); // 查询所有新闻分类
router.patch('/:id', auth, authAdmin, update); // 根据id更新新闻分类

module.exports = router;
