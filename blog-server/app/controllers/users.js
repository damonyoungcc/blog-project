const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const { secret } = require('../config');

class UsersCtl {
  async find(ctx) {}
  async findById(ctx) {}
  async create(ctx) {}
  async checkOwner(ctx, next) {}
  async update(ctx) {}
  async delete(ctx) {}
  async login(ctx) {}
}

module.exports = new UsersCtl();
