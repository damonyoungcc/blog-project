const jsonwebtoken = require('jsonwebtoken');
const News = require('../models/news');
const { secret } = require('../config');

class NewsCtl {
  // 新增新闻
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
      origin: { type: 'string', required: true },
      author: { type: 'string', required: true },
      image: { type: 'string', required: false },
      newsType: { type: 'string', required: true },
    });
    const { title } = ctx.request.body;
    const repeatedNews = await News.findOne({ title });
    if (repeatedNews) {
      ctx.throw(409, '新闻标题已存在！');
    }
    const news = await new News(ctx.request.body).save();
    ctx.body = news;
  }
  // 查询新闻列表 title模糊搜索
  async find(ctx) {
    ctx.body = await News.find({ title: new RegExp(ctx.query.q) }).populate('newsType');
  }
  // 根据id查询新闻详细
  async findById(ctx) {
    const news = await News.findById(ctx.params.id)
      .select('+content')
      .populate('newsType');
    if (!news) {
      ctx.throw(404, '该新闻不存在');
    }
    ctx.body = news;
  }
  // 根据id编辑新闻
  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
      origin: { type: 'string', required: true },
      author: { type: 'string', required: true },
      image: { type: 'string', required: false },
      newsType: { type: 'string', required: true },
    });
    const news = await News.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!news) {
      ctx.throw(404, '新闻不存在！');
    }
    ctx.body = news;
  }
}

module.exports = new NewsCtl();
