const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
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
const { secret } = require('../config');

const auth = jwt({ secret });

router.post('/', create); // 新增用户
router.get('/', auth, authAdmin, find); // 查询所有用户
router.get('/:id', auth, findById); // 查询用户个人信息
router.patch('/:id', auth, checkOwner, update);
router.delete('/:id', auth, authAdmin, del);
router.post('/login', login);
router.get('/info', auth, getUserInfo);

module.exports = router;
