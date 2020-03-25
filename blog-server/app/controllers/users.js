const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const { secret } = require('../config');

class UsersCtl {
  async find(ctx) {}
  async findById(ctx) {}
  async create(ctx) {}
  async checkOwner(ctx, next) {
    next();
  }
  async getUserInfo(ctx) {}
  async update(ctx) {}
  async delete(ctx) {}
  async login(ctx) {}
  async authAdmin(ctx, next) {
    next();
  }
}

module.exports = new UsersCtl();
