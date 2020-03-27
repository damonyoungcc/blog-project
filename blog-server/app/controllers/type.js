const jsonwebtoken = require('jsonwebtoken');
const Type = require('../models/type');
const { secret } = require('../config');

class TypeCtl {
  // 新增新闻分类
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
    });
    const { name } = ctx.request.body;
    const repeatedType = await Type.findOne({ name });
    if (repeatedType) {
      ctx.throw(409, '分类已存在！');
    }
    const type = await new Type(ctx.request.body).save();
    ctx.body = type;
  }
  async find(ctx) {
    ctx.body = await Type.find();
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
    });
    const type = await Type.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!type) {
      ctx.throw(404, '类型不存在！');
    }
    ctx.body = type;
  }
}

module.exports = new TypeCtl();
