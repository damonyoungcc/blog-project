const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    __v: { type: Number, select: false },
    sid: { type: String, required: true },
    password: { type: String, required: false, select: false },
    fullName: { type: String, required: true },
    nickName: { type: String, required: false },
  },
  { timestamps: true },
);

module.exports = model('User', userSchema);
