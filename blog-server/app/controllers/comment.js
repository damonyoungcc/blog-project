const jsonwebtoken = require('jsonwebtoken');
const Comment = require('../models/comment');
const { secret } = require('../config');

class CommentCtl {
  // 新增新闻分类
  async create(ctx) {}
  async find(ctx) {}
  async createReplyComment(ctx) {}
}

module.exports = new CommentCtl();
