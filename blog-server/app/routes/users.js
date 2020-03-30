const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/api/users' });
const {
  find,
  findById,
  create,
  update,
  delete: del,
  login,
  checkOwner,
  authAdmin,
  getUserInfo,
} = require('../controllers/users');
const { findByUserId } = require('../controllers/topics');
const { secret } = require('../config');

const auth = jwt({ secret });

router.patch('/:id', auth, checkOwner, update); // 修改用户资料
router.post('/login', login); // 登录
router.get('/info', auth, getUserInfo); // 获取用户登录态
router.get('/:id/topics', auth, checkOwner, findByUserId); // 获取用户发布的所有的帖子

// 管理员权限
router.post('/', auth, authAdmin, create); // 新增用户，增加管理员后加入管理员操作权限 authAdmin
router.get('/', auth, authAdmin, find); // 查询所有用户
router.delete('/:id', auth, authAdmin, del); // 删除某个用户

module.exports = router;
