const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    __v: { type: Number, select: false },
    sid: { type: String, required: true },
    password: { type: String, required: true, select: false },
    fullName: { type: String, required: true, select: false },
    nickName: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = model('User', userSchema);
