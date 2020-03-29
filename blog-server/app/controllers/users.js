const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const { secret } = require('../config');

class UsersCtl {
  // 普通用户
  // 根据id查询特定用户
  async findById(ctx) {
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }
  // 注册
  async create(ctx) {
    ctx.verifyParams({
      sid: { type: 'string', required: true },
      password: { type: 'string', required: true },
      fullName: { type: 'string', required: true },
      nickName: { type: 'string', required: true },
    });
    const { sid, nickName } = ctx.request.body;
    if (nickName === 'admin') {
      ctx.throw(409, '不可使用admin此用户名！');
    }
    const repeatedUser = await User.findOne({ sid });
    if (repeatedUser) {
      ctx.throw(409, '学号已经存在!');
    }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }
  // 更新用户资料
  async update(ctx) {
    ctx.verifyParams({
      sid: { type: 'string', required: false },
      password: { type: 'string', required: false },
      fullName: { type: 'string', required: false },
      nickName: { type: 'string', required: false },
    });
    const checkUser = User.findById(ctx.params.id);
    const { nickName: nick } = checkUser || {};
    if (nick === 'admin') {
      ctx.throw(409, '超级管理员不可修改！');
    }
    const { nickName, password } = ctx.request.body;
    const user = await User.findByIdAndUpdate(ctx.params.id, { nickName, password });
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }
  // 登录
  async login(ctx) {
    ctx.verifyParams({
      sid: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, '学号或密码不正确');
    }
    const { _id, sid, nickName, fullName } = user;
    const token = jsonwebtoken.sign({ _id, nickName, sid, fullName }, secret, { expiresIn: '1d' });
    ctx.body = { token };
  }
  // 获取登录态
  async getUserInfo(ctx) {
    const { nickName, sid, fullName, _id } = ctx.state.user;
    ctx.body = { nickName, sid, _id, fullName, isLogin: true };
  }

  // 管理员全新啊
  // 查找用户列表
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await User.find({ nickName: new RegExp(ctx.query.q) })
      .limit(perPage)
      .skip(page * perPage);
  }
  // 根据id删除某个特定用户
  async delete(ctx) {
    const deleteUser = await User.findById(ctx.params.id);
    const { sid } = deleteUser || {};
    if (sid === '0001') {
      ctx.throw(409, '不可删除管理员!');
    } else {
      const user = await User.findByIdAndRemove(ctx.params.id);
      if (!user) {
        ctx.throw(404, '用户不存在');
      }
      ctx.status = 204;
    }
  }

  // 中间件
  // 验证是否是管理员
  async authAdmin(ctx, next) {
    if (ctx.state.user.nickName !== 'admin') {
      ctx.throw(409, '您没有管理员权限！');
    }
    await next();
  }
  // 验证是否是本人操作
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限！');
    }
    await next();
  }
}

module.exports = new UsersCtl();
