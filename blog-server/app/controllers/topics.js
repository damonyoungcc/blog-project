const jsonwebtoken = require('jsonwebtoken');
const Topics = require('../models/topics');
const { secret } = require('../config');

class TopicsCtrl {
  // 新增新闻分类
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
      image: { type: 'string', required: false },
    });
    const poster = ctx.state.user._id;
    const topic = await new Topics({ title, content, image, poster }).save();
    ctx.body = topic;
  }
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await Topics.find()
      .limit(perPage)
      .skip(page * perPage)
      .populate('poster');
  }
  async findById(ctx) {

  }
  async findByUserId(ctx) {
    
  }
  async delete(ctx) {}
}

module.exports = new TopicsCtrl();
